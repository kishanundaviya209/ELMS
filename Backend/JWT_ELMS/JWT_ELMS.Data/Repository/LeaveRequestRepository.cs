using JWT_ELMS.Data.Context;
using JWT_ELMS.Data.Entities;
using JWT_ELMS.Data.Enums;
using JWT_ELMS.Data.IRepository;
using Microsoft.EntityFrameworkCore;

namespace JWT_ELMS.Data.Repository
{
    public class LeaveRequestRepository : ILeaveRequestRepository
    {
        private readonly ApplicationDbContext _context;
        public LeaveRequestRepository(ApplicationDbContext ctx) => _context = ctx;



        public async Task<LeaveRequest> ApplyLeaveAsync(LeaveRequest leave)
        {
            _context.LeaveRequests.Add(leave);
            await _context.SaveChangesAsync();
            return leave;
        }


        public async Task<LeaveRequest?> GetLeaveByIdAsync(int leaveRequestId)
        {
            return await _context.LeaveRequests
                .Include(l => l.ApplicantionUser)
                .Include(l => l.Department)
                .FirstOrDefaultAsync(l => l.LeaveRequestId == leaveRequestId);
        }


        public async Task<IEnumerable<LeaveRequest>> GetLeaveByUserIdAsync(string applicantId)
        {
            return await _context.LeaveRequests
                .Where(l => l.ApplicantId == applicantId)
                .Include(l => l.ApplicantionUser)
                .Include(l => l.Department)
                .ToListAsync();
        }


        public async Task<LeaveRequest?> UpdateLeaveAsync(LeaveRequest leave)
        {
            var existing = await _context.LeaveRequests
                .FirstOrDefaultAsync(x => x.LeaveRequestId == leave.LeaveRequestId);

            if (existing == null) return null;

            existing.Status = leave.Status;
            existing.AdminComment = leave.AdminComment;
            existing.ReviewedById = leave.ReviewedById;

            await _context.SaveChangesAsync();

            return await _context.LeaveRequests
                .Include(l => l.Department)
                .Include(l => l.ApplicantionUser)
                .FirstOrDefaultAsync(x => x.LeaveRequestId == existing.LeaveRequestId);
        }



        public async Task<IEnumerable<LeaveRequest>> GetAllLeaveAsync()
        {
            return await _context.LeaveRequests
                .Include(l => l.ApplicantionUser)
                .Include(l => l.Department)
                .ToListAsync();
        }


        public async Task<IEnumerable<LeaveRequest>> GetAllLeaveByStatusAsync(LeaveStatus status)
        {
            return await _context.LeaveRequests
                .Where(x => x.Status == status)
                .Include(l => l.ApplicantionUser)
                .Include(l => l.Department)
                .ToListAsync();
        }

        public async Task<IEnumerable<LeaveRequest>> GetAllLeaveByDepartmentIdAsync(int departmentId)
        {
            return await _context.LeaveRequests
       .Where(x => x.DepartmentId == departmentId)
       .Include(l => l.ApplicantionUser)
       .Include(l => l.Department)
       .ToListAsync();
        }



        public async Task<LeaveRequest> CanceledLeave(int id)
        {
            var cancelLeave = await _context.LeaveRequests.FirstOrDefaultAsync(x => x.LeaveRequestId == id);

            if (cancelLeave == null)
            {
                throw new KeyNotFoundException("Leave not found");
            }

            cancelLeave.Status = LeaveStatus.Canceled;

            await _context.SaveChangesAsync();

            return cancelLeave;
        }




        public async Task<IEnumerable<LeaveRequest>> GetAllLeaveByDateRangeAsync(DateTime fromDate, DateTime toDate)
        {
            // Include full end day
            toDate = toDate.Date.AddDays(1).AddTicks(-1);

            return await _context.LeaveRequests
                .Where(l =>
                    l.FromDate <= toDate &&
                    l.ToDate >= fromDate
                )
                .Include(l => l.ApplicantionUser)
                .Include(l => l.Department)
                .ToListAsync();
        }




        public async Task<bool> HasLeaveRequestsByUserIdAsync(string userId)
        {
            return await _context.LeaveRequests
                .AnyAsync(l => l.ApplicantId == userId);
        }

    }
}
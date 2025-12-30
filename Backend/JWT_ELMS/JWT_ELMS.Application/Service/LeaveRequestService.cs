using JWT_ELMS.Application.DTOs.Request.leave;
using JWT_ELMS.Application.DTOs.Response;
using JWT_ELMS.Data.Entities;
using JWT_ELMS.Data.Enums;
using JWT_ELMS.Data.IRepository;

namespace JWT_ELMS.Application.Service
{
    public class LeaveRequestService : ILeaveRequestService
    {
        private readonly ILeaveRequestRepository _leaveRequestRepository;
        private readonly IUserRepository _userRepository;
        private readonly IDepartmentRepository _departmentRepository;

        public LeaveRequestService(ILeaveRequestRepository repo, IUserRepository userRepository, IDepartmentRepository departmentRepository)
        {
            _leaveRequestRepository = repo;
            _userRepository = userRepository;
            _departmentRepository = departmentRepository;
        }

        public async Task<List<LeaveResponseDto>> GetAllLeaveAsync()
        {
            var list = await _leaveRequestRepository.GetAllLeaveAsync();

            return list.Select(l => new LeaveResponseDto
            {
                Id = l.LeaveRequestId,
                UserName = l.ApplicantionUser?.FullName ?? "",
                DepartmentName = l.Department?.DepartmentName ?? "",
                FromDate = l.FromDate,
                ToDate = l.ToDate,
                Reason = l.Reason,
                Status = l.Status.ToString(),
                AdminComment = l.AdminComment
            }).ToList();
        }


        public async Task<IEnumerable<LeaveResponseDto?>> GetLeaveByUserIdAsync(string applicantId)
        {
            var leave = await _leaveRequestRepository.GetLeaveByUserIdAsync(applicantId);
            return leave.Select(leave =>  new LeaveResponseDto
            {
                Id = leave.LeaveRequestId,
                UserName = leave.ApplicantionUser?.FullName ?? "",
                FromDate = leave.FromDate,
                ToDate = leave.ToDate,
                Reason = leave.Reason,
                Status = leave.Status.ToString(),
                AdminComment = leave.AdminComment,
                DepartmentName = leave.Department?.DepartmentName ?? ""
            });
        }

        public async Task<LeaveResponseDto> ApplyLeaveAsync(ApplyLeaveDto dto)
        {
            var leave = new LeaveRequest
            {
                ApplicantId = dto.ApplicantId,
                DepartmentId = dto.DepartmentId,
                FromDate = dto.FromDate,
                ToDate = dto.ToDate,
                Reason = dto.Reason,
                Status = LeaveStatus.Pending
            };

            var created = await _leaveRequestRepository.ApplyLeaveAsync(leave);
            return Map(created);
        }



        public async Task<LeaveResponseDto?> UpdateLeaveAsync(UpdateLeaveDto dto)
        {
            var leave = await _leaveRequestRepository
                .GetLeaveByIdAsync(dto.LeaveRequestId);

            if (leave == null) return null;

            leave.Status = dto.Approve
                ? LeaveStatus.Approved
                : LeaveStatus.Rejected;

            leave.AdminComment = dto.AdminComment;
            leave.ReviewedById = dto.AdminApproveId;

            var updated = await _leaveRequestRepository.UpdateLeaveAsync(leave);

            return updated == null ? null : Map(updated);
        }

        public async Task<IEnumerable<LeaveResponseDto>> GetAllLeaveByStatusAsync(string status)
        {
            var s = (LeaveStatus)System.Enum.Parse(typeof(LeaveStatus), status, true);
            var list = await _leaveRequestRepository.GetAllLeaveByStatusAsync(s);
            return list.Select(Map);
        }

        public async Task<IEnumerable<LeaveResponseDto>> GetAllLeaveByDepartmentIdAsync(int departmentId)
        {
            var list = await _leaveRequestRepository.GetAllLeaveByDepartmentIdAsync(departmentId);
            return list.Select(Map);
        }


        public async Task<LeaveRequest> CanceledLeave(int id)
        {
            return await _leaveRequestRepository.CanceledLeave(id);
        }




        public async Task<IEnumerable<LeaveResponseDto>> GetAllLeaveByDateRangeAsync(DateTime fromDate, DateTime toDate)
        {
            var list = await _leaveRequestRepository.GetAllLeaveByDateRangeAsync(fromDate, toDate);

            return list.Select(l => new LeaveResponseDto
            {
                Id = l.LeaveRequestId,
                UserName = l.ApplicantionUser?.FullName ?? "",
                DepartmentName = l.Department?.DepartmentName ?? "",
                FromDate = l.FromDate,
                ToDate = l.ToDate,
                Reason = l.Reason,
                Status = l.Status.ToString(),
                AdminComment = l.AdminComment
            });
        }





        public async Task<bool> HasLeaveRequestsByUserIdAsync(string userId)
        {
            return await _leaveRequestRepository.HasLeaveRequestsByUserIdAsync(userId);
        }




        private LeaveResponseDto Map(LeaveRequest l)
        {
            return new LeaveResponseDto
            {
                Id = l.LeaveRequestId,
                UserName = l.ApplicantionUser?.FullName ?? "",
                FromDate = l.FromDate,
                ToDate = l.ToDate,
                Reason = l.Reason,
                Status = l.Status.ToString(),
                AdminComment = l.AdminComment,
                DepartmentName = l.Department?.DepartmentName ?? ""
            };
        }

    }
}
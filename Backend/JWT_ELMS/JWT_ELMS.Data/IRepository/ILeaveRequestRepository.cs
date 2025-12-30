using JWT_ELMS.Data.Entities;
using JWT_ELMS.Data.Enums;

namespace JWT_ELMS.Data.IRepository
{
    public interface ILeaveRequestRepository
    {
        Task<LeaveRequest> ApplyLeaveAsync(LeaveRequest leave);

        Task<IEnumerable<LeaveRequest>> GetLeaveByUserIdAsync(string applicantId);

        Task<LeaveRequest?> GetLeaveByIdAsync(int leaveRequestId);

        Task<LeaveRequest?> UpdateLeaveAsync(LeaveRequest leave);

        Task<IEnumerable<LeaveRequest>> GetAllLeaveAsync();

        Task<IEnumerable<LeaveRequest>> GetAllLeaveByStatusAsync(LeaveStatus status);

        Task<IEnumerable<LeaveRequest>> GetAllLeaveByDepartmentIdAsync(int departmentId);

        Task<LeaveRequest> CanceledLeave(int id);

        Task<IEnumerable<LeaveRequest>> GetAllLeaveByDateRangeAsync(DateTime fromDate, DateTime toDate);

        Task<bool> HasLeaveRequestsByUserIdAsync(string userId);
    }
}

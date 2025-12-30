using JWT_ELMS.Application.DTOs.Request.leave;
using JWT_ELMS.Application.DTOs.Response;
using JWT_ELMS.Data.Entities;

public interface ILeaveRequestService
{
    Task<LeaveResponseDto> ApplyLeaveAsync(ApplyLeaveDto dto);

    Task<IEnumerable<LeaveResponseDto?>> GetLeaveByUserIdAsync(string applicantId);

    Task<LeaveResponseDto?> UpdateLeaveAsync(UpdateLeaveDto dto);

    Task<List<LeaveResponseDto>> GetAllLeaveAsync();
    Task<IEnumerable<LeaveResponseDto>> GetAllLeaveByStatusAsync(string status);
    Task<IEnumerable<LeaveResponseDto>> GetAllLeaveByDepartmentIdAsync(int departmentId);
    Task<LeaveRequest> CanceledLeave(int id);
    Task<IEnumerable<LeaveResponseDto>> GetAllLeaveByDateRangeAsync(DateTime fromDate, DateTime toDate);
    Task<bool> HasLeaveRequestsByUserIdAsync(string userId);

}

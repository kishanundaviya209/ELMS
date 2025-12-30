using JWT_ELMS.Application.DTOs.Request.leave;
using Microsoft.AspNetCore.Mvc;

namespace JWT_ELMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LeaveRequestController : ControllerBase
    {
        private readonly ILeaveRequestService _leaveRequestService;

        public LeaveRequestController(ILeaveRequestService svc)
        {
            _leaveRequestService = svc;
        }


        [HttpPost("apply")]
        public async Task<IActionResult> ApplyLeave(ApplyLeaveDto dto)
        {
            var result = await _leaveRequestService.ApplyLeaveAsync(dto);

            return Ok(result);
        }


        [HttpPost("update")]
        public async Task<IActionResult> UpdateLeave(UpdateLeaveDto dto)
        {
            var result = await _leaveRequestService.UpdateLeaveAsync(dto);

            return result == null ? NotFound() : Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetLeaveByUserId(string id)
        {
            var result = await _leaveRequestService.GetLeaveByUserIdAsync(id);
            return result == null ? NotFound() : Ok(result);
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAllLeave()
        {
            return Ok(await _leaveRequestService.GetAllLeaveAsync());
        }

        [HttpGet("bystatus/{status}")]
        public async Task<IActionResult> GetByStatus(string status)
        {
            return Ok(await _leaveRequestService.GetAllLeaveByStatusAsync(status));
        }

        [HttpGet("bydepartment/{departmentId}")]
        public async Task<IActionResult> GetByDepartment(int departmentId)
        {
            return Ok(await _leaveRequestService.GetAllLeaveByDepartmentIdAsync(departmentId));
        }

        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> CanceledLeave(int id)
        {
            return Ok(await _leaveRequestService.CanceledLeave(id));
        }


        [HttpPost("filter-by-date")]
        public async Task<IActionResult> FilterByDate([FromBody] LeaveDateFilterDto dto)
        {
            if (dto.FromDate > dto.ToDate)
                return BadRequest("FromDate cannot be greater than ToDate");

            var result = await _leaveRequestService
                .GetAllLeaveByDateRangeAsync(dto.FromDate, dto.ToDate);

            return Ok(result);
        }

    }
}

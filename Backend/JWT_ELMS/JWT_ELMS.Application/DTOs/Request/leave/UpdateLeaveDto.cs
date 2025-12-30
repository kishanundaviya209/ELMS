namespace JWT_ELMS.Application.DTOs.Request.leave
{
    public class UpdateLeaveDto
    {
        public int LeaveRequestId { get; set; }
        public string? AdminApproveId { get; set; }
        public bool Approve { get; set; }
        public string? AdminComment { get; set; }
    }
}

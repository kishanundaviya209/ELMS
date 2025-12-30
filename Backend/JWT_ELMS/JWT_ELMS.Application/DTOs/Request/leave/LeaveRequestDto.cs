namespace JWT_ELMS.Application.DTOs.Request.leave
{
    public class LeaveRequestDto
    {
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public string Reason { get; set; } = string.Empty;
        public int? DepartmentId { get; set; } 
    }
}

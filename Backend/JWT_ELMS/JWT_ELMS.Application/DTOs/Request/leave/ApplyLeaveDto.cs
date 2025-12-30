namespace JWT_ELMS.Application.DTOs.Request.leave
{
    public class ApplyLeaveDto
    {
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public string? Reason { get; set; }
        public int? DepartmentId { get; set; }
        public string? ApplicantId { get; set; }
    }
}

namespace JWT_ELMS.Application.DTOs.Response
{
    public class LeaveResponseDto
    {
        public int Id { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public string? Reason { get; set; }
        public string? Status { get; set; }
        public string? AdminComment { get; set; }
        public string? UserName { get; set; }
        public string? DepartmentName { get; set; }
    }
}

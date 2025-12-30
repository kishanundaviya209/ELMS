using JWT_ELMS.Data.Enums;

namespace JWT_ELMS.Data.Entities
{
    public class LeaveRequest
    {
        public int  LeaveRequestId { get; set; }
        public string? ApplicantId { get; set; }
        public ApplicationUser? ApplicantionUser { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public string? Reason { get; set; }
        public LeaveStatus Status { get; set; } = LeaveStatus.Pending;
        public DateTime SubmittedAt { get; set; } = DateTime.Now;
        public string? ReviewedById { get; set; }
        public ApplicationUser? ReviewedBy { get; set; }
        public string? AdminComment { get; set; }
        public int? DepartmentId { get; set; }
        public virtual Department? Department { get; set; }


    }
}

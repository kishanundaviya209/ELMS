using Microsoft.AspNetCore.Identity;

namespace JWT_ELMS.Data.Entities
{
    public class ApplicationUser : IdentityUser
    {
        public string? FullName { get; set; }
        public int? DepartmentId { get; set; }
        public Department? Department { get; set; }

        public ICollection<LeaveRequest>? LeaveRequests { get; set; }
    }
}

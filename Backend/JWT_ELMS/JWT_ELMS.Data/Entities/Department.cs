namespace JWT_ELMS.Data.Entities
{
    public class Department
    {
        public int DepartmentId { get; set; }
        public string? DepartmentName { get; set; }
        public string? Description { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public ICollection<ApplicationUser>? Employee { get; set; }

    }
}

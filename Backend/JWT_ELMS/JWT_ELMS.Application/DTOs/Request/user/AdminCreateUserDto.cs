namespace JWT_ELMS.Application.DTOs.Request.user
{
    public class AdminCreateUserDto
    {
        public string? FullName { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public int? DepartmentId { get; set; }
    }
}


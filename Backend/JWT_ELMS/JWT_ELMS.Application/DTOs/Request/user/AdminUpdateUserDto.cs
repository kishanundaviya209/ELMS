using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JWT_ELMS.Application.DTOs.Request.user
{
    public class AdminUpdateUserDto
    {
        public string? FullName { get; set; }
        public int? DepartmentId { get; set; }
    }
}
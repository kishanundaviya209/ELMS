using JWT_ELMS.Application.DTOs.Request;
using JWT_ELMS.Application.IService;
using Microsoft.AspNetCore.Mvc;

namespace JWT_ELMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        private readonly IDepartmentService _departmentService;

        public DepartmentController(IDepartmentService departmentService)
        {
            _departmentService = departmentService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllDepartment()
        {
            var departments = await _departmentService.GetAllAsync();
            return Ok(departments);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetDepartment(int id)
        {
            var department = await _departmentService.GetByIdAsync(id);
            if (department == null)
            {
                return NotFound();
            }
            return Ok(department);
        }


        [HttpPost]
        public async Task<IActionResult> AddDepartment(DepartmentRequestDto dto)
        {
            var adddepartment = await _departmentService.CreateAsync(dto);
            return Ok(adddepartment);
        }

        [HttpPost("update/{id}")]
        public async Task<IActionResult> UpdateDepartment(int id, DepartmentRequestDto dto)
        {
            var updatedDepartment = await _departmentService.UpdateAsync(id, dto);
            if (updatedDepartment == null)
            {
                return NotFound();
            }
            return Ok(updatedDepartment);
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteDepartment(int id)
        {
            var deleted = await _departmentService.DeleteAsync(id);
            return Ok(deleted);
        }
    }
}

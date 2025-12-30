using JWT_ELMS.Application.DTOs.Request;
using JWT_ELMS.Data.Entities;

namespace JWT_ELMS.Application.IService
{
    public interface IDepartmentService
    {
        Task<IEnumerable<Department>> GetAllAsync();
        Task<Department?> GetByIdAsync(int id);
        Task<Department> CreateAsync(DepartmentRequestDto dto);
        Task<Department> UpdateAsync(int id, DepartmentRequestDto dto);
        Task<Department> DeleteAsync(int id);
    }
}

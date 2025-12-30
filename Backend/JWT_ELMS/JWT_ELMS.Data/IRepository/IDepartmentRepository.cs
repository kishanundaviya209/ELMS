using JWT_ELMS.Data.Entities;

namespace JWT_ELMS.Data.IRepository
{
    public interface IDepartmentRepository
    {
        Task<Department> AddAsync(Department department);
        Task<Department> DeleteDepartment(int id);
        Task<IEnumerable<Department>> GetAllAsync();
        Task<Department?> GetByIdAsync(int? id);
        Task<Department> UpdateAsync(int id, Department department);
    }
}

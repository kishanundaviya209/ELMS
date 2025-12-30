using JWT_ELMS.Application.DTOs.Request;
using JWT_ELMS.Application.IService;
using JWT_ELMS.Data.Entities;
using JWT_ELMS.Data.IRepository;

namespace JWT_ELMS.Application.Service
{
    public class DepartmentService : IDepartmentService
    {
        private readonly IDepartmentRepository _departmentRepository;

        public DepartmentService(IDepartmentRepository repo)
        {
            _departmentRepository = repo;
        }

        public async Task<Department> CreateAsync(DepartmentRequestDto dto)
        {
            var dept = new Department
            {
                DepartmentName = dto.DepartmentName,
                Description = dto.Description,
            };
            return await _departmentRepository.AddAsync(dept);

        }

        public async Task<Department> DeleteAsync(int id)
        {
            return await _departmentRepository.DeleteDepartment(id);;
        }

        public async Task<IEnumerable<Department>> GetAllAsync()
        {
            return await _departmentRepository.GetAllAsync();
        }

        public async Task<Department?> GetByIdAsync(int id)
        {
            return await _departmentRepository.GetByIdAsync(id);
        }

        public async Task<Department> UpdateAsync(int id, DepartmentRequestDto dto)
        {
            var existingdept = await _departmentRepository.GetByIdAsync(id);

            if(existingdept == null)
            {
                throw new KeyNotFoundException("Not f");
            }

            existingdept.DepartmentName = dto.DepartmentName;
            existingdept.Description = dto.Description;

            return await _departmentRepository.UpdateAsync(id , existingdept);
        }
    }
}
using JWT_ELMS.Data.Context;
using JWT_ELMS.Data.Entities;
using JWT_ELMS.Data.IRepository;
using Microsoft.EntityFrameworkCore;

namespace JWT_ELMS.Data.Repository
{
    public class DepartmentRepository : IDepartmentRepository
    {
        private readonly ApplicationDbContext _db;

        public DepartmentRepository(ApplicationDbContext context)
        {
            _db = context;
        }

        public async Task<IEnumerable<Department>> GetAllAsync()
        {
            return await _db.Departments.ToListAsync();
        }

        public async Task<Department?> GetByIdAsync(int? id)
        {
            return await _db.Departments.FindAsync(id);
        }


        public async Task<Department> AddAsync(Department department)
        {
            await _db.Departments.AddAsync(department);
            await _db.SaveChangesAsync();
            return department;
        }


        public async Task<Department> UpdateAsync(int id, Department department)
        {
            if (id != department.DepartmentId)
            {
                throw new ArgumentException("Department ID mismatch");
            }

            _db.Update(department);
            await _db.SaveChangesAsync();
            return department;
        }

        public async Task<Department> DeleteDepartment(int id)
        {
            var dept = await _db.Departments.FindAsync(id);

            if (dept == null)
            {
                throw new KeyNotFoundException("Department not found");
            }

            _db.Departments.Remove(dept);

            await _db.SaveChangesAsync();

            return dept;
        }
    }
}
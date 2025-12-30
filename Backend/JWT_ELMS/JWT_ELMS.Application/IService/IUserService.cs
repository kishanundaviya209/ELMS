using JWT_ELMS.Data.Entities;

namespace JWT_ELMS.Application.IService
{
    public interface IUserService
    {
        Task<IEnumerable<ApplicationUser>> GetAllUsersAsync();
        Task<ApplicationUser?> GetUserByIdAsync(string id);

        Task<bool> GetUserByEmailAsync(string email);
    }
}

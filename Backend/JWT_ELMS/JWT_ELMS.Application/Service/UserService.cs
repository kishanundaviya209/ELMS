using JWT_ELMS.Application.IService;
using JWT_ELMS.Data.Entities;
using JWT_ELMS.Data.IRepository;

namespace JWT_ELMS.Application.Service
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<IEnumerable<ApplicationUser>> GetAllUsersAsync() => await _userRepository.GetAllAsync();

        public async Task<ApplicationUser?> GetUserByIdAsync(string id)
        {
            return await _userRepository.GetByIdAsync(id);
        }

        public async Task<bool> GetUserByEmailAsync(string email)
        {
            var res = await _userRepository.GetByEmailAsync(email);
            if (res == null) return false;

            return true;
        }
    }
}

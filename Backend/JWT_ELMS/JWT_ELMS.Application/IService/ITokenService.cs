using JWT_ELMS.Data.Entities;

namespace JWT_ELMS.Application.IService
{
    public interface ITokenService
    {
        Task<string> CreateTokenAsync(ApplicationUser user);
    }
}

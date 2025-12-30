using JWT_ELMS.Application.DTOs.Request;
using JWT_ELMS.Application.DTOs.Request.ResetPassword;
using JWT_ELMS.Application.DTOs.Response;

namespace JWT_ELMS.Application.IService
{
    public interface IAuthService
    {
        Task<AuthResponseDto?> RegisterAsync(RegisterRequestDto dto);
        Task<AuthResponseDto?> LoginAsync(LoginRequestDto dto);


        Task<bool> ForgotPasswordAsync(string email);
        Task<AuthResponseDto?> ResetPasswordAsync(ResetPasswordRequestDto dto);
    }
}

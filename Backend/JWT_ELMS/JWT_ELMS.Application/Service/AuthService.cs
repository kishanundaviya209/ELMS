using System.Text;
using JWT_ELMS.Application.DTOs.Request;
using JWT_ELMS.Application.DTOs.Request.ResetPassword;
using JWT_ELMS.Application.DTOs.Response;
using JWT_ELMS.Application.IService;
using JWT_ELMS.Data.Entities;
using JWT_ELMS.Data.IRepository;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.WebUtilities;

namespace JWT_ELMS.Application.Service
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly ITokenService _tokenService;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IEmailService _emailService;

        public AuthService(
            IUserRepository userRepository,
            ITokenService tokenService,
            UserManager<ApplicationUser> userManager,
            IEmailService emailService)
        {
            _userRepository = userRepository;
            _tokenService = tokenService;
            _userManager = userManager;
            _emailService = emailService;
        }

        public async Task<AuthResponseDto?> LoginAsync(LoginRequestDto loginDto)
        {
            var user = await _userRepository.GetByEmailAsync(loginDto.Email);

            if (user == null || !await _userRepository.CheckPasswordAsync(user, loginDto.Password))
            {
                return null;
            }

            var roles = await _userManager.GetRolesAsync(user);

            var role = roles.FirstOrDefault();

            string token = await _tokenService.CreateTokenAsync(user);

            return new AuthResponseDto
            {
                Token = token,
                Role = role,
                DepartmentId = user.DepartmentId,
                UserId = user.Id,
                Email = user.Email!,
                FullName = user.FullName!
            };
        }

        public async Task<AuthResponseDto?> RegisterAsync(RegisterRequestDto registerDto)
        {
            var newUser = new ApplicationUser
            {
                UserName = registerDto.Email,
                Email = registerDto.Email,
                FullName = registerDto.FullName,
                DepartmentId = registerDto.DepartmentId
            };

            bool created = await _userRepository.CreateUserAsync(newUser, registerDto.Password);
            if (!created)
            {
                return null;
            }

            await _userManager.AddToRoleAsync(newUser, "User");

            string token = await _tokenService.CreateTokenAsync(newUser);

            return new AuthResponseDto
            {
                Token = token,
                UserId = newUser.Id,
                Email = newUser.Email ?? "",
                FullName = newUser.FullName ?? ""
            };
        }






        //public async Task<bool> ForgotPasswordAsync(string email)
        //{
        //    var user = await _userRepository.GetByEmailAsync(email);
        //    if (user == null) return false;

        //    var token = await _userManager.GeneratePasswordResetTokenAsync(user);

        //    var tokenBase64 = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(token));

        //    var resetLink = $"http://localhost:5173/reset-password?email={tokenBase64}";

        //    await _emailService.SendAsync(email, "Reset Your Password", resetLink);

        //    return true;
        //}


        public async Task<bool> ForgotPasswordAsync(string email)
        {
            var user = await _userRepository.GetByEmailAsync(email);
            if (user == null) return false;

            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            var tokenBase64 = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(token));

            var resetLink =
                $"http://localhost:5173/reset-password?email={Uri.EscapeDataString(user.Email!)}&token={tokenBase64}";

            await _emailService.SendAsync(email, "Reset Your Password", resetLink);

            return true;
        }



        public async Task<AuthResponseDto?> ResetPasswordAsync(ResetPasswordRequestDto dto)
        {
            var user = await _userRepository.GetByEmailAsync(dto.Email);
            if (user == null) return null;

            var decodedBytes = WebEncoders.Base64UrlDecode(dto.Token);

            var decodedToken = Encoding.UTF8.GetString(decodedBytes);

            var result = await _userManager.ResetPasswordAsync(
                user,
                decodedToken,
                dto.NewPassword
            );

            if (!result.Succeeded) return null;

            // Generate fresh JWT after reset
            var token = await _tokenService.CreateTokenAsync(user);

            return new AuthResponseDto
            {
                Token = token,
                UserId = user.Id,
                Email = user.Email!,
                FullName = user.FullName!
            };
        }

    }
}

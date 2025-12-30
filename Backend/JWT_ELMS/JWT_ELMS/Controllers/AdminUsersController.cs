using JWT_ELMS.Application.DTOs.Request.user;
using JWT_ELMS.Application.IService;
using JWT_ELMS.Data.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace JWT_ELMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminUsersController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IUserService _userService;
        private readonly ILeaveRequestService _leaveRequestService;


        public AdminUsersController(UserManager<ApplicationUser> userManager, IUserService userService, ILeaveRequestService leaveRequestService)
        {
            _userManager = userManager;
            _userService = userService;
            _leaveRequestService = leaveRequestService;
        }


        [HttpGet]
        public IActionResult GetAllUsers()
        {
            var users = _userManager.Users.Select(u => new
            {
                u.Id,
                u.FullName,
                u.Email,
                u.DepartmentId
            }).ToList();

            return Ok(users);
        }


        [HttpGet("email")]
        public async Task<IActionResult> GetUserByEmailAsync(string email)
        {
            var res = await _userService.GetUserByEmailAsync(email);

            return Ok(res);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null) return NotFound();

            return Ok(new
            {
                user.Id,
                user.FullName,
                user.Email,
                user.DepartmentId
            });
        }


        [HttpPost]
        public async Task<IActionResult> CreateUser(AdminCreateUserDto model)
        {
            if (await _userManager.FindByEmailAsync(model.Email) != null)
                return BadRequest("User already exists");

            var user = new ApplicationUser
            {
                UserName = model.Email,
                Email = model.Email,
                FullName = model.FullName,
                DepartmentId = model.DepartmentId
            };

            var result = await _userManager.CreateAsync(user, model.Password);

            if (!result.Succeeded)
                return BadRequest(result.Errors);

            await _userManager.AddToRoleAsync(user, "User");

            return Ok("User created successfully");
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(string id, AdminUpdateUserDto model)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null) return NotFound();

            user.FullName = model.FullName;
            user.DepartmentId = model.DepartmentId;

            var result = await _userManager.UpdateAsync(user);
            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Ok("User updated successfully");
        }


        //[HttpDelete("{id}")]
        //public async Task<IActionResult> DeleteUser(string id)
        //{
        //    var user = await _userManager.FindByIdAsync(id);
        //    if (user == null) return NotFound();

        //    var result = await _userManager.DeleteAsync(user);
        //    if (!result.Succeeded)
        //        return BadRequest(result.Errors);

        //    return Ok("User deleted successfully");
        //}


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
                return NotFound(new { message = "User not found" });

            var hasLeaves =
                await _leaveRequestService.HasLeaveRequestsByUserIdAsync(id);

            if (hasLeaves)
            {
                return BadRequest(new
                {
                    message = "Cannot delete user. Leave requests exist for this user."
                });
            }

            var result = await _userManager.DeleteAsync(user);

            if (!result.Succeeded)
                return BadRequest(new { message = "Failed to delete user" });

            return Ok(new { message = "User deleted successfully" });
        }



    }
}

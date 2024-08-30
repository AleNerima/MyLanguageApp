using Microsoft.AspNetCore.Mvc;
using LanguageAppBackend.Models;
using LanguageAppBackend.Services;

namespace LanguageAppBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginViewModel loginViewModel)
        {
            if (loginViewModel == null)
            {
                return BadRequest("Invalid client request");
            }

            var user = await _authService.AuthenticateUserAsync(loginViewModel.Email, loginViewModel.Password);
            if (user == null)
            {
                return Unauthorized("Invalid credentials");
            }

            return Ok("User authenticated successfully");
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterViewModel registerViewModel)
        {
            if (registerViewModel == null)
            {
                return BadRequest("Invalid client request");
            }

            var user = new User
            {
                Email = registerViewModel.Email,
                PasswordHash = registerViewModel.Password, // Assuming this is plain text password
                Username = registerViewModel.Username,
                NativeLanguage = registerViewModel.NativeLanguage,
                TargetLanguage = registerViewModel.TargetLanguage,
                CreatedAt = DateTime.UtcNow
            };

            var result = await _authService.RegisterUserAsync(user);
            if (result == null)
            {
                return BadRequest("Registration failed");
            }

            return Ok("User registered successfully");
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await _authService.LogoutAsync();
            return Ok("Logged out successfully");
        }
    }
}

using Microsoft.AspNetCore.Mvc;
using LanguageAppBackend.Models;
using LanguageAppBackend.Services;

namespace LanguageAppBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginViewModel loginModel)
        {
            var token = await _authService.AuthenticateUserAsync(loginModel);
            if (token == null)
            {
                return Unauthorized();
            }
            return Ok(new { Token = token });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterViewModel registerModel)
        {
            var user = await _authService.RegisterUserAsync(registerModel);
            return CreatedAtAction(nameof(Register), new { id = user.UserId }, user);
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await _authService.LogoutAsync();
            return NoContent(); // Il logout è gestito lato client, quindi non c'è necessità di fare nulla qui.
        }
    }
}

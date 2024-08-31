using Microsoft.AspNetCore.Mvc;
using LanguageAppBackend.Models;
using LanguageAppBackend.Services;
using System.Threading.Tasks;

namespace LanguageAppBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetUserById(int userId)
        {
            var user = await _userService.GetUserByIdAsync(userId);
            if (user == null)
            {
                return NotFound("User not found");
            }
            return Ok(user);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] UpdateUserViewModel updateUserViewModel)
        {
            // Verifica che il modello di aggiornamento sia valido
            if (updateUserViewModel == null || id != updateUserViewModel.UserId)
            {
                return BadRequest("Invalid user data.");
            }

            // Passa il modello di aggiornamento al servizio
            var updatedUser = await _userService.UpdateUserAsync(updateUserViewModel);
            if (updatedUser == null)
            {
                return NotFound();
            }

            // Restituisci l'utente aggiornato
            return Ok(updatedUser);
        }


        [HttpDelete("{userId}")]
        public async Task<IActionResult> DeleteUser(int userId)
        {
            var success = await _userService.DeleteUserAsync(userId);
            if (!success)
            {
                return NotFound("User not found");
            }

            return Ok("User deleted successfully");
        }
    }
}

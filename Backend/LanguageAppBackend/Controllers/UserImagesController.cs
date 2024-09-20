using LanguageAppBackend.Models;
using LanguageAppBackend.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace LanguageAppBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserImagesController : ControllerBase
    {
        private readonly IUserImageService _userImageService;

        public UserImagesController(IUserImageService userImageService)
        {
            _userImageService = userImageService;
        }

        [HttpPost("upload/{userId}")]
        public async Task<IActionResult> UploadProfileImage(int userId, [FromBody] ImageUploadDto uploadDto)
        {
            if (uploadDto == null || string.IsNullOrEmpty(uploadDto.Base64Image))
                return BadRequest("L'immagine non può essere vuota.");

            try
            {
                var result = await _userImageService.UploadProfileImageAsync(userId, uploadDto.Base64Image);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut("update/{userId}")]
        public async Task<IActionResult> UpdateProfileImage(int userId, [FromBody] ImageUploadDto uploadDto)
        {
            if (uploadDto == null || string.IsNullOrEmpty(uploadDto.Base64Image))
                return BadRequest("L'immagine non può essere vuota.");

            try
            {
                var result = await _userImageService.UpdateProfileImageAsync(userId, uploadDto.Base64Image);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("profile/{userId}")]
        public async Task<IActionResult> GetProfileImage(int userId)
        {
            var image = await _userImageService.GetProfileImageAsync(userId);
            if (image == null)
            {
                return NotFound("Immagine non trovata.");
            }
            return Ok(image);
        }
    }
}

using System.Security.Claims;
using LanguageAppBackend.Models;
using LanguageAppBackend.Models.PostCommentViewModel;
using LanguageAppBackend.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace LanguageAppBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CommentController : ControllerBase
    {
        private readonly ICommentService _commentService;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public CommentController(ICommentService commentService, IHttpContextAccessor httpContextAccessor)
        {
            _commentService = commentService;
            _httpContextAccessor = httpContextAccessor;
        }

        // Crea un nuovo commento
        [HttpPost]
        public async Task<IActionResult> CreateComment([FromBody] CommentViewModel commentViewModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userId = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userId == null)
            {
                return Unauthorized();
            }

            commentViewModel.UserId = int.Parse(userId);

            var result = await _commentService.CreateCommentAsync(commentViewModel);

            return CreatedAtAction(nameof(GetCommentById), new { id = result.CommentId }, result);
        }

        // Aggiorna un commento esistente
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateComment(int id, [FromBody] CommentViewModel commentViewModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userId = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userId == null)
            {
                return Unauthorized();
            }

            commentViewModel.UserId = int.Parse(userId);

            var result = await _commentService.UpdateCommentAsync(id, commentViewModel);

            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        // Elimina un commento
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteComment(int id)
        {
            var result = await _commentService.DeleteCommentAsync(id);

            if (!result)
            {
                return NotFound();
            }

            return NoContent();
        }

        // Recupera un commento per ID
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCommentById(int id)
        {
            var comment = await _commentService.GetCommentByIdAsync(id);

            if (comment == null)
            {
                return NotFound();
            }

            return Ok(comment);
        }

        // Recupera tutti i commenti per un post
        [HttpGet("post/{postId}")]
        public async Task<IActionResult> GetCommentsByPostId(int postId)
        {
            var comments = await _commentService.GetCommentsByPostIdAsync(postId);
            return Ok(comments);
        }
    }

}

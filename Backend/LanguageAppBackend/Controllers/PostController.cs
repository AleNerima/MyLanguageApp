using System.Security.Claims;
using LanguageAppBackend.Models;
using LanguageAppBackend.Models.PostCommentViewModel;
using LanguageAppBackend.Services;
using LanguageAppBackend.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace LanguageAppBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PostController : ControllerBase
    {
        private readonly IPostService _postService;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public PostController(IPostService postService, IHttpContextAccessor httpContextAccessor)
        {
            _postService = postService;
            _httpContextAccessor = httpContextAccessor;
        }

        // Crea un nuovo post
        [HttpPost]
        public async Task<IActionResult> CreatePost([FromBody] PostViewModel postViewModel)
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

            postViewModel.UserId = int.Parse(userId);

            var result = await _postService.CreatePostAsync(postViewModel);

            return CreatedAtAction(nameof(GetPostById), new { id = result.PostId }, result);
        }

        // Aggiorna un post esistente
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePost(int id, [FromBody] PostViewModel postViewModel)
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

            postViewModel.UserId = int.Parse(userId);

            var result = await _postService.UpdatePostAsync(id, postViewModel);

            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        // Elimina un post
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePost(int id)
        {
            var result = await _postService.DeletePostAsync(id);

            if (!result)
            {
                return NotFound();
            }

            return NoContent();
        }

        // Recupera un post per ID
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPostById(int id)
        {
            var post = await _postService.GetPostByIdAsync(id);

            if (post == null)
            {
                return NotFound();
            }

            return Ok(post);
        }

        // Recupera tutti i post
        [HttpGet]
        public async Task<IActionResult> GetAllPosts()
        {
            var posts = await _postService.GetAllPostsAsync();
            return Ok(posts);
        }
    }

}

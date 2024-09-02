using Microsoft.AspNetCore.Mvc;

using LanguageAppBackend.Models;

using LanguageAppBackend.Services.Interfaces;


[ApiController]
[Route("api/[controller]")]
public class FriendshipController : ControllerBase
{
    private readonly IFriendshipService _friendshipService;

    public FriendshipController(IFriendshipService friendshipService)
    {
        _friendshipService = friendshipService;
    }

    [HttpGet("byUser/{userId}")]
    public async Task<ActionResult<IEnumerable<Friendship>>> GetFriendshipsByUserId(int userId)
    {
        var friendships = await _friendshipService.GetFriendshipsByUserIdAsync(userId);
        return Ok(friendships);
    }

    [HttpGet("byId/{friendshipId}")]
    public async Task<ActionResult<Friendship>> GetFriendshipById(int friendshipId)
    {
        var friendship = await _friendshipService.GetFriendshipByIdAsync(friendshipId);
        if (friendship == null)
            return NotFound();
        return Ok(friendship);
    }

    [HttpPost]
    public async Task<IActionResult> CreateFriendship([FromBody] FriendshipViewModel model)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var friendship = new Friendship
        {
            UserId1 = model.UserId1,
            UserId2 = model.UserId2,
            StartedAt = DateTime.Now
        };

        // Usa il servizio per aggiungere la nuova amicizia
        var createdFriendship = await _friendshipService.CreateFriendshipAsync(friendship);

        return Ok(createdFriendship);
    }



    [HttpDelete("{friendshipId}")]
    public async Task<ActionResult> DeleteFriendship(int friendshipId)
    {
        if (await _friendshipService.DeleteFriendshipAsync(friendshipId))
            return NoContent();
        return NotFound();
    }
}

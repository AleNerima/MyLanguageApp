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

    // Ottieni tutte le amicizie confermate per un utente
    [HttpGet("byUser/{userId}")]
    public async Task<ActionResult<IEnumerable<Friendship>>> GetFriendshipsByUserId(int userId)
    {
        var friendships = await _friendshipService.GetFriendshipsByUserIdAsync(userId);
        return Ok(friendships);
    }

    // Ottieni le richieste di amicizia pendenti
    [HttpGet("pending/{userId}")]
    public async Task<ActionResult<IEnumerable<Friendship>>> GetPendingRequests(int userId)
    {
        var pendingRequests = await _friendshipService.GetPendingRequestsForUserAsync(userId);
        return Ok(pendingRequests);
    }

    // Ottieni una singola amicizia tramite ID
    [HttpGet("byId/{friendshipId}")]
    public async Task<ActionResult<Friendship>> GetFriendshipById(int friendshipId)
    {
        var friendship = await _friendshipService.GetFriendshipByIdAsync(friendshipId);
        if (friendship == null)
            return NotFound();
        return Ok(friendship);
    }

    // Crea una nuova richiesta di amicizia
    [HttpPost]
    public async Task<IActionResult> CreateFriendship([FromBody] FriendshipViewModel model)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var friendship = new Friendship
        {
            UserId1 = model.UserId1,
            UserId2 = model.UserId2,
            RequesterId = model.UserId1, // Chi ha inviato la richiesta
            Status = FriendshipStatus.Pending,
            StartedAt = DateTime.Now
        };

        var createdFriendship = await _friendshipService.CreateFriendshipAsync(friendship);
        return Ok(createdFriendship);
    }


    // Aggiorna lo stato di una richiesta di amicizia (accetta o rifiuta)
    [HttpPut("{friendshipId}/status")]
    public async Task<IActionResult> UpdateStatus(int friendshipId, [FromBody] FriendshipStatusUpdateModel model)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var friendship = await _friendshipService.GetFriendshipByIdAsync(friendshipId);
        if (friendship == null)
            return NotFound();

        friendship.Status = (FriendshipStatus)model.Status; 
        var updated = await _friendshipService.UpdateFriendshipAsync(friendship);

        if (!updated)
            return BadRequest("Unable to update friendship status.");

        return Ok(friendship);
    }





    // Elimina una richiesta di amicizia
    [HttpDelete("{friendshipId}")]
    public async Task<ActionResult> DeleteFriendship(int friendshipId)
    {
        if (await _friendshipService.DeleteFriendshipAsync(friendshipId))
            return NoContent();
        return NotFound();
    }

    
    [HttpGet("checkRequest/{userId1}/{userId2}")]
    public IActionResult CheckExistingRequest(int userId1, int userId2)
    {
        var exists = _friendshipService.CheckRequestExists(userId1, userId2);
        return Ok(exists);
    }

}

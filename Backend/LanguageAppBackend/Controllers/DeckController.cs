using Microsoft.AspNetCore.Mvc;
using LanguageAppBackend.Services;
using LanguageAppBackend.Models.DeckCardViewModel;

[ApiController]
[Route("api/[controller]")]
public class DeckController : ControllerBase
{
    private readonly IDeckService _deckService;

    public DeckController(IDeckService deckService)
    {
        _deckService = deckService;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetDeck(int id)
    {
        var deck = await _deckService.GetDeckByIdAsync(id);
        if (deck == null)
            return NotFound();

        return Ok(deck);
    }

    [HttpGet("user/{userId}")]
    public async Task<IActionResult> GetDecksByUser(int userId)
    {
        var decks = await _deckService.GetDecksByUserIdAsync(userId);
        return Ok(decks);
    }

    [HttpPost]
    public async Task<IActionResult> CreateDeck([FromBody] CreateDeckViewModel viewModel)
    {
        var deck = await _deckService.CreateDeckAsync(viewModel);
        return CreatedAtAction(nameof(GetDeck), new { id = deck.DeckId }, deck);
    }

    [HttpPut]
    public async Task<IActionResult> UpdateDeck([FromBody] UpdateDeckViewModel viewModel)
    {
        var deck = await _deckService.UpdateDeckAsync(viewModel);
        if (deck == null)
            return NotFound();

        return Ok(deck);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteDeck(int id)
    {
        var success = await _deckService.DeleteDeckAsync(id);
        if (!success)
            return NotFound();

        return NoContent();
    }
}

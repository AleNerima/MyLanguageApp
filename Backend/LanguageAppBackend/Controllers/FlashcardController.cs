using Microsoft.AspNetCore.Mvc;
using LanguageAppBackend.Services;
using LanguageAppBackend.Models.DeckCardViewModel;

[ApiController]
[Route("api/[controller]")]
public class FlashcardController : ControllerBase
{
    private readonly IFlashcardService _flashcardService;

    public FlashcardController(IFlashcardService flashcardService)
    {
        _flashcardService = flashcardService;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetFlashcard(int id)
    {
        var flashcard = await _flashcardService.GetFlashcardByIdAsync(id);
        if (flashcard == null)
            return NotFound();

        return Ok(flashcard);
    }

    [HttpGet("deck/{deckId}")]
    public async Task<IActionResult> GetFlashcardsByDeck(int deckId)
    {
        var flashcards = await _flashcardService.GetFlashcardsByDeckIdAsync(deckId);
        return Ok(flashcards);
    }

    [HttpPost]
    public async Task<IActionResult> CreateFlashcard([FromBody] CreateFlashcardViewModel viewModel)
    {
        var flashcard = await _flashcardService.CreateFlashcardAsync(viewModel);
        return CreatedAtAction(nameof(GetFlashcard), new { id = flashcard.CardId }, flashcard);
    }

    [HttpPut]
    public async Task<IActionResult> UpdateFlashcard([FromBody] UpdateFlashcardViewModel viewModel)
    {
        var flashcard = await _flashcardService.UpdateFlashcardAsync(viewModel);
        if (flashcard == null)
            return NotFound();

        return Ok(flashcard);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteFlashcard(int id)
    {
        var success = await _flashcardService.DeleteFlashcardAsync(id);
        if (!success)
            return NotFound();

        return NoContent();
    }
}

using LanguageAppBackend.Models;
using LanguageAppBackend.Models.DeckCardViewModel;

namespace LanguageAppBackend.Services
{
    public interface IFlashcardService
    {
        Task<Flashcard> GetFlashcardByIdAsync(int cardId);
        Task<IEnumerable<Flashcard>> GetFlashcardsByDeckIdAsync(int deckId);
        Task<Flashcard> CreateFlashcardAsync(CreateFlashcardViewModel viewModel);
        Task<Flashcard> UpdateFlashcardAsync(UpdateFlashcardViewModel viewModel);
        Task<bool> DeleteFlashcardAsync(int cardId);
    }
}

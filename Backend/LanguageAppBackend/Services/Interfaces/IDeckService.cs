using LanguageAppBackend.Models;
using LanguageAppBackend.Models.DeckCardViewModel;

namespace LanguageAppBackend.Services
{
    public interface IDeckService
    {
        Task<Deck> GetDeckByIdAsync(int deckId);
        Task<IEnumerable<Deck>> GetDecksByUserIdAsync(int userId);
        Task<Deck> CreateDeckAsync(CreateDeckViewModel viewModel);
        Task<Deck> UpdateDeckAsync(UpdateDeckViewModel viewModel);
        Task<bool> DeleteDeckAsync(int deckId);
    }
}

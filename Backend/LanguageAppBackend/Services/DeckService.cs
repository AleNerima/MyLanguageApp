using LanguageAppBackend.Models;
using LanguageAppBackend.Data;
using Microsoft.EntityFrameworkCore;
using LanguageAppBackend.Models.DeckCardViewModel;

namespace LanguageAppBackend.Services
{
    public class DeckService : IDeckService
    {
        private readonly ApplicationDbContext _context;

        public DeckService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Deck> GetDeckByIdAsync(int deckId)
        {
            return await _context.Decks
                .Include(d => d.Flashcards)
                .SingleOrDefaultAsync(d => d.DeckId == deckId);
        }

        public async Task<IEnumerable<Deck>> GetDecksByUserIdAsync(int userId)
        {
            return await _context.Decks
                .Where(d => d.UserId == userId)
                .Include(d => d.Flashcards)
                .ToListAsync();
        }

        public async Task<Deck> CreateDeckAsync(CreateDeckViewModel viewModel)
        {
            var deck = new Deck
            {
                Name = viewModel.Name,
                Description = viewModel.Description,
                UserId = viewModel.UserId
            };

            _context.Decks.Add(deck);
            await _context.SaveChangesAsync();

            return deck;
        }

        public async Task<Deck> UpdateDeckAsync(UpdateDeckViewModel viewModel)
        {
            var deck = await _context.Decks.FindAsync(viewModel.DeckId);
            if (deck == null)
                return null;

            deck.Name = viewModel.Name;
            deck.Description = viewModel.Description;

            _context.Decks.Update(deck);
            await _context.SaveChangesAsync();

            return deck;
        }

        public async Task<bool> DeleteDeckAsync(int deckId)
        {
            // Trova il deck con le flashcards associate
            var deck = await _context.Decks
                .Include(d => d.Flashcards) // Include le flashcards per la rimozione
                .SingleOrDefaultAsync(d => d.DeckId == deckId);

            if (deck == null)
                return false;

            // Rimuovi tutte le flashcards associate
            _context.Flashcards.RemoveRange(deck.Flashcards);

            // Rimuovi il deck
            _context.Decks.Remove(deck);

            // Salva le modifiche nel database
            await _context.SaveChangesAsync();

            return true;
        }

    }
}

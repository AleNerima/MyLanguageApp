using LanguageAppBackend.Models;
using LanguageAppBackend.Data;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using LanguageAppBackend.Models.DeckCardViewModel;

namespace LanguageAppBackend.Services
{
    public class FlashcardService : IFlashcardService
    {
        private readonly ApplicationDbContext _context;

        public FlashcardService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Flashcard> GetFlashcardByIdAsync(int cardId)
        {
            return await _context.Flashcards
                .Include(f => f.Deck)  // Continua a includere Deck se necessario
                .SingleOrDefaultAsync(f => f.CardId == cardId);
        }

        public async Task<IEnumerable<Flashcard>> GetFlashcardsByDeckIdAsync(int deckId)
        {
            return await _context.Flashcards
                .Where(f => f.DeckId == deckId)
                .ToListAsync();
        }

        public async Task<Flashcard> CreateFlashcardAsync(CreateFlashcardViewModel viewModel)
        {
            var flashcard = new Flashcard
            {
                Term = viewModel.Term,
                Definition = viewModel.Definition,
                DifficultyLevel = viewModel.DifficultyLevel,
                DeckId = viewModel.DeckId
                // Rimosso UserId
            };

            _context.Flashcards.Add(flashcard);
            await _context.SaveChangesAsync();

            return flashcard;
        }

        public async Task<Flashcard> UpdateFlashcardAsync(UpdateFlashcardViewModel viewModel)
        {
            var flashcard = await _context.Flashcards.FindAsync(viewModel.CardId);
            if (flashcard == null)
                return null;

            flashcard.Term = viewModel.Term;
            flashcard.Definition = viewModel.Definition;
            flashcard.DifficultyLevel = viewModel.DifficultyLevel;
            flashcard.NextReviewDate = CalculateNextReviewDate(viewModel.DifficultyLevel);

            _context.Flashcards.Update(flashcard);
            await _context.SaveChangesAsync();

            return flashcard;
        }

        public async Task<bool> DeleteFlashcardAsync(int cardId)
        {
            var flashcard = await _context.Flashcards.FindAsync(cardId);
            if (flashcard == null)
                return false;

            _context.Flashcards.Remove(flashcard);
            await _context.SaveChangesAsync();

            return true;
        }

        private DateTime CalculateNextReviewDate(byte difficultyLevel)
        {
            var now = DateTime.UtcNow;
            switch (difficultyLevel)
            {
                case 0: // Facile
                    return now.AddDays(7);
                case 1: // Difficile
                    return now.AddHours(1);
                case 2: // Estremamente Difficile
                    return now.AddMinutes(10);
                default:
                    return now;
            }
        }
    }
}

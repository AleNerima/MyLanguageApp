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
            var nextReviewDate = now; // Default

            switch (difficultyLevel)
            {
                case 1: // Facile
                    nextReviewDate = now.AddDays(3); // Aggiungi giorni 
                    break;
                case 2: // Difficile
                    nextReviewDate = now.AddMinutes(5); // Aggiungi minuti
                    break;
                case 3: // Estremamente Difficile
                    nextReviewDate = now.AddSeconds(2); // Aggiungi secondi
                    break;
                default:
                    nextReviewDate = now;
                    break;
            }

            // Log for debugging
            Console.WriteLine($"Difficulty Level: {difficultyLevel}");
            Console.WriteLine($"Now: {now}");
            Console.WriteLine($"Next Review Date: {nextReviewDate}");

            return nextReviewDate;
        }

    }
}

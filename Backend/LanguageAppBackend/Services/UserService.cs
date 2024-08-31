using Microsoft.EntityFrameworkCore;
using LanguageAppBackend.Models;
using LanguageAppBackend.Data;

namespace LanguageAppBackend.Services
{
    public class UserService : IUserService
    {
        private readonly ApplicationDbContext _context;

        public UserService(ApplicationDbContext context)
        {
            _context = context;
        }

        //Funzione di recupero dell'utente con tutto ciò che è associato 
        public async Task<User> GetUserByIdAsync(int userId)
        {
            return await _context.Users
                .Include(u => u.Decks)
                .Include(u => u.Flashcards)
                .Include(u => u.Posts)
                .Include(u => u.Comments)
                .Include(u => u.Friendships1)
                .Include(u => u.Friendships2)
                .Include(u => u.ChatsAsUser1)
                .Include(u => u.ChatsAsUser2)
                .SingleOrDefaultAsync(u => u.UserId == userId);
        }

        //Funzione dedicata all'update delle informazioni base dell'utente 
        public async Task<User> UpdateUserAsync(UpdateUserViewModel updateUserViewModel)
        {
            // Trova l'utente esistente
            var existingUser = await _context.Users.FindAsync(updateUserViewModel.UserId);

            // Verifica se l'utente esiste
            if (existingUser == null)
                return null;

            // Aggiorna solo i campi forniti
            if (!string.IsNullOrEmpty(updateUserViewModel.Username))
                existingUser.Username = updateUserViewModel.Username;

            if (!string.IsNullOrEmpty(updateUserViewModel.Email))
                existingUser.Email = updateUserViewModel.Email;

            // Assicura che la PasswordHash non sia modificata direttamente a meno che non sia intenzionale
            if (!string.IsNullOrEmpty(updateUserViewModel.PasswordHash))
            {
                // Assicura l'hashing della nuova password se si sta aggiornando il campo
                existingUser.PasswordHash = BCrypt.Net.BCrypt.HashPassword(updateUserViewModel.PasswordHash);
            }

            if (!string.IsNullOrEmpty(updateUserViewModel.NativeLanguage))
                existingUser.NativeLanguage = updateUserViewModel.NativeLanguage;

            if (!string.IsNullOrEmpty(updateUserViewModel.TargetLanguage))
                existingUser.TargetLanguage = updateUserViewModel.TargetLanguage;

            // Salva le modifiche nel database
            _context.Users.Update(existingUser);
            await _context.SaveChangesAsync();

            return existingUser;
        }


        //Funzione di Delete che elimina l'utente e tutto ciò che è associato ad esso
        //in caso di eliminazione dell'account
        public async Task<bool> DeleteUserAsync(int userId)
        {
            var user = await _context.Users
                .Include(u => u.Decks)
                .Include(u => u.Flashcards)
                .Include(u => u.Posts)
                .Include(u => u.Comments)
                .Include(u => u.Friendships1)
                .Include(u => u.Friendships2)
                .Include(u => u.ChatsAsUser1)
                .Include(u => u.ChatsAsUser2)
                .SingleOrDefaultAsync(u => u.UserId == userId);

            if (user == null)
                return false;

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}

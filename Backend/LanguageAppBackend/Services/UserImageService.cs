using LanguageAppBackend.Data;
using LanguageAppBackend.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace LanguageAppBackend.Services
{
    public class UserImageService : IUserImageService
    {
        private readonly ApplicationDbContext _context;

        public UserImageService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<string> UploadProfileImageAsync(int userId, string base64Image)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null) throw new Exception("Utente non trovato.");

            var existingImage = await _context.UserImages.FirstOrDefaultAsync(img => img.UserId == userId);
            if (existingImage != null)
            {
                existingImage.ImageData = base64Image;
                _context.UserImages.Update(existingImage);
            }
            else
            {
                var userImage = new UserImage
                {
                    UserId = userId,
                    ImageData = base64Image
                };
                _context.UserImages.Add(userImage);
            }

            await _context.SaveChangesAsync();
            return "Immagine caricata/aggiornata con successo.";
        }

        public async Task<string> UpdateProfileImageAsync(int userId, string newBase64Image)
        {
            var userImage = await _context.UserImages.FirstOrDefaultAsync(img => img.UserId == userId);
            if (userImage == null) throw new Exception("Immagine non trovata.");

            userImage.ImageData = newBase64Image;
            _context.UserImages.Update(userImage);
            await _context.SaveChangesAsync();

            return "Immagine aggiornata con successo.";
        }

        public async Task<string> GetProfileImageAsync(int userId)
        {
            var userImage = await _context.UserImages.FirstOrDefaultAsync(img => img.UserId == userId);
            return userImage?.ImageData;
        }
    }
}

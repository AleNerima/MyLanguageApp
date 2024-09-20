

namespace LanguageAppBackend.Services
{
    public interface IUserImageService
    {
        Task<string> UploadProfileImageAsync(int userId, string base64Image);
        Task<string> UpdateProfileImageAsync(int userId, string newBase64Image);
        Task<string> GetProfileImageAsync(int userId);
    }
}

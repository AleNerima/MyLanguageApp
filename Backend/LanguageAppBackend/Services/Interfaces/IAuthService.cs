using LanguageAppBackend.Models;

namespace LanguageAppBackend.Services
{
    public interface IAuthService
    {
        Task<User> AuthenticateUserAsync(string email, string password);
        Task<User> RegisterUserAsync(User user);
        Task LogoutAsync();
    }
}

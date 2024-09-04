using LanguageAppBackend.Models;

namespace LanguageAppBackend.Services
{
    public interface IAuthService
    {
        Task<string> AuthenticateUserAsync(LoginViewModel loginModel);
        Task<User> RegisterUserAsync(RegisterViewModel registerModel);
        Task LogoutAsync(); // JWT è stateless, quindi il logout è gestito dal client.
    }
}

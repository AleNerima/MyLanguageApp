using LanguageAppBackend.Models;

namespace LanguageAppBackend.Services
{
    public interface IUserService
    {
        Task<User> GetUserByIdAsync(int userId);
        Task<User> UpdateUserAsync(UpdateUserViewModel updateUserViewModel);
        Task<bool> DeleteUserAsync(int userId);
    }
}

using LanguageAppBackend.Models;

namespace LanguageAppBackend.Services.Interfaces
{
    public interface IFriendshipService
    {
        Task<IEnumerable<Friendship>> GetFriendshipsByUserIdAsync(int userId);
        Task<Friendship> GetFriendshipByIdAsync(int friendshipId);
        Task<bool> CreateFriendshipAsync(Friendship friendship);
        Task<bool> DeleteFriendshipAsync(int friendshipId);
    }
}

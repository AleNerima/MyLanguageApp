using LanguageAppBackend.Models;

namespace LanguageAppBackend.Services.Interfaces
{
    public interface IChatService
    {
        Task<IEnumerable<Chat>> GetChatsByUserIdAsync(int userId);
        Task<Chat> GetChatByIdAsync(int chatId);
        Task<bool> CreateChatAsync(Chat chat);
        Task<bool> DeleteChatAsync(int chatId);
    }
}

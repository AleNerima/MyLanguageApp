using LanguageAppBackend.Models;

namespace LanguageAppBackend.Services
{
    public interface IChatService
    {
        Task<Chat> CreateChatAsync(int userId1, int userId2);
        Task<IEnumerable<ChatMessage>> GetMessagesAsync(int chatId);
        Task SendMessageAsync(int chatId, int senderId, int receiverId, string messageText);
        Task UpdateMessageStatusAsync(int messageId, int userId, bool isRead);
        Task<Dictionary<int, int>> GetUnreadMessageCountsAsync(int userId);

        Task<Chat> GetChatDetailsAsync(int chatId);
        Task<int> GetChatIdAsync(int userId1, int userId2);

    }
}

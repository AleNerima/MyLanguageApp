using Microsoft.EntityFrameworkCore;
using LanguageAppBackend.Models;
using LanguageAppBackend.Data;

namespace LanguageAppBackend.Services
{
    public class ChatService : IChatService
    {
        private readonly ApplicationDbContext _context;

        public ChatService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Chat> CreateChatAsync(int userId1, int userId2)
        {
            var chat = new Chat
            {
                UserId1 = userId1,
                UserId2 = userId2
            };

            _context.Chats.Add(chat);
            await _context.SaveChangesAsync();
            return chat;
        }

        public async Task<IEnumerable<ChatMessage>> GetMessagesAsync(int chatId)
        {
            return await _context.ChatMessages
                .Where(m => m.ChatId == chatId)
                .OrderBy(m => m.CreatedAt)
                .ToListAsync();
        }

        public async Task SendMessageAsync(int chatId, int senderId, int receiverId, string messageText)
        {
            var message = new ChatMessage
            {
                ChatId = chatId,
                SenderId = senderId,
                ReceiverId = receiverId,
                MessageText = messageText,
                CreatedAt = DateTime.UtcNow
            };

            _context.ChatMessages.Add(message);
            await _context.SaveChangesAsync();

            
            var messageStatus = new MessageStatus
            {
                MessageId = message.MessageId,
                UserId = receiverId,
                IsRead = false
            };

            _context.MessageStatuses.Add(messageStatus);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateMessageStatusAsync(int messageId, int userId, bool isRead)
        {
            var status = await _context.MessageStatuses
                .FirstOrDefaultAsync(ms => ms.MessageId == messageId && ms.UserId == userId);

            if (status != null)
            {
                status.IsRead = isRead;
                _context.MessageStatuses.Update(status);
                await _context.SaveChangesAsync();
            }
        }


        public async Task<Chat> GetChatDetailsAsync(int chatId)
        {
            var chat = await _context.Chats
                .Include(c => c.User1)
                .Include(c => c.User2)
                .Include(c => c.Messages)
                .FirstOrDefaultAsync(c => c.ChatId == chatId);

            if (chat == null)
            {
                return null;
            }

            return new Chat
            {
                ChatId = chat.ChatId,
                UserId1 = chat.UserId1,
                UserId2 = chat.UserId2,
                Messages = chat.Messages.Select(m => new ChatMessage
                {
                    MessageId = m.MessageId,
                    ChatId = m.ChatId,
                    SenderId = m.SenderId,
                    ReceiverId = m.ReceiverId,
                    MessageText = m.MessageText,
                    CreatedAt = m.CreatedAt
                }).ToList()
            };
        }

        public async Task<int> GetChatIdAsync(int userId1, int userId2)
        {
            // Trova la chat che corrisponde alla combinazione di userId1 e userId2
            var chat = await _context.Chats
                .Where(c =>
                    (c.UserId1 == userId1 && c.UserId2 == userId2) ||
                    (c.UserId1 == userId2 && c.UserId2 == userId1))
                .FirstOrDefaultAsync();

            if (chat != null)
            {
                return chat.ChatId; // Restituisci l'ID della chat se esiste
            }

            // Se non esiste una chat, creane una nuova
            chat = await CreateChatAsync(userId1, userId2);
            return chat.ChatId; // Restituisci l'ID della nuova chat
        }

        public async Task<Dictionary<int, int>> GetUnreadMessageCountsAsync(int userId)
        {
            return await _context.MessageStatuses
                .Where(ms => ms.UserId == userId && !ms.IsRead)
                .GroupBy(ms => ms.ChatMessage.ChatId)
                .Select(g => new { ChatId = g.Key, UnreadCount = g.Count() })
                .ToDictionaryAsync(x => x.ChatId, x => x.UnreadCount);
        }



    }
}

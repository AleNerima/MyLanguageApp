using Microsoft.EntityFrameworkCore;
using LanguageAppBackend.Data;
using LanguageAppBackend.Models;
using LanguageAppBackend.Services.Interfaces;

public class ChatService : IChatService
{
    private readonly ApplicationDbContext _context;

    public ChatService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Chat>> GetChatsByUserIdAsync(int userId)
    {
        return await _context.Chats
            .Where(c => c.UserId1 == userId || c.UserId2 == userId)
            .ToListAsync();
    }

    public async Task<Chat> GetChatByIdAsync(int chatId)
    {
        return await _context.Chats
            .Include(c => c.User1)
            .Include(c => c.User2)
            .SingleOrDefaultAsync(c => c.ChatId == chatId);
    }

    public async Task<bool> CreateChatAsync(Chat chat)
    {
        _context.Chats.Add(chat);
        return await _context.SaveChangesAsync() > 0;
    }

    public async Task<bool> DeleteChatAsync(int chatId)
    {
        var chat = await _context.Chats.FindAsync(chatId);
        if (chat == null)
            return false;

        _context.Chats.Remove(chat);
        return await _context.SaveChangesAsync() > 0;
    }
}

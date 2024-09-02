using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using LanguageAppBackend.Data;
using LanguageAppBackend.Models;
using LanguageAppBackend.Services.Interfaces;

public class FriendshipService : IFriendshipService
{
    private readonly ApplicationDbContext _context;

    public FriendshipService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Friendship>> GetFriendshipsByUserIdAsync(int userId)
    {
        return await _context.Friendships
            .Where(f => f.UserId1 == userId || f.UserId2 == userId)
            .ToListAsync();
    }

    public async Task<Friendship> GetFriendshipByIdAsync(int friendshipId)
    {
        return await _context.Friendships
            .Include(f => f.User1)
            .Include(f => f.User2)
            .SingleOrDefaultAsync(f => f.FriendshipId == friendshipId);
    }

    public async Task<bool> CreateFriendshipAsync(Friendship friendship)
    {
        _context.Friendships.Add(friendship);
        return await _context.SaveChangesAsync() > 0;
    }

    public async Task<bool> DeleteFriendshipAsync(int friendshipId)
    {
        var friendship = await _context.Friendships.FindAsync(friendshipId);
        if (friendship == null)
            return false;

        _context.Friendships.Remove(friendship);
        return await _context.SaveChangesAsync() > 0;
    }
}

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

    // Ottieni le amicizie confermate (Accepted) per un utente
    public async Task<IEnumerable<Friendship>> GetFriendshipsByUserIdAsync(int userId)
    {
        return await _context.Friendships
            .Where(f => (f.UserId1 == userId || f.UserId2 == userId) && f.Status == FriendshipStatus.Accepted)
            .ToListAsync();
    }

    // Ottieni le richieste di amicizia pendenti per un utente (Pending)
    public async Task<IEnumerable<Friendship>> GetPendingRequestsForUserAsync(int userId)
    {
        return await _context.Friendships
            .Where(f => f.UserId2 == userId && f.Status == FriendshipStatus.Pending)  // Solo richieste ricevute
            .ToListAsync();
    }

    // Ottieni una singola amicizia tramite ID
    public async Task<Friendship> GetFriendshipByIdAsync(int friendshipId)
    {
        return await _context.Friendships
            .Include(f => f.User1)
            .Include(f => f.User2)
            .SingleOrDefaultAsync(f => f.FriendshipId == friendshipId);
    }

    // Crea una nuova richiesta di amicizia (Pending)
    public async Task<bool> CreateFriendshipAsync(Friendship friendship)
    {
        friendship.Status = FriendshipStatus.Pending;
        _context.Friendships.Add(friendship);
        return await _context.SaveChangesAsync() > 0;
    }

    // Aggiorna lo stato di una richiesta (Accepted o Rejected)
    public async Task<bool> UpdateFriendshipAsync(Friendship friendship)
    {
        _context.Friendships.Update(friendship);
        return await _context.SaveChangesAsync() > 0;
    }

    // Elimina una richiesta di amicizia
    public async Task<bool> DeleteFriendshipAsync(int friendshipId)
    {
        var friendship = await _context.Friendships.FindAsync(friendshipId);
        if (friendship == null)
            return false;

        _context.Friendships.Remove(friendship);
        return await _context.SaveChangesAsync() > 0;
    }
}

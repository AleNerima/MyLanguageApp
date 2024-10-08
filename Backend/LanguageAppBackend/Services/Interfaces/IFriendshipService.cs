﻿using LanguageAppBackend.Models;

namespace LanguageAppBackend.Services.Interfaces
{
    public interface IFriendshipService
    {
        Task<IEnumerable<Friendship>> GetFriendshipsByUserIdAsync(int userId);
        Task<IEnumerable<Friendship>> GetPendingRequestsForUserAsync(int userId);
        Task<Friendship> GetFriendshipByIdAsync(int friendshipId);
        Task<bool> CreateFriendshipAsync(Friendship friendship);
        Task<bool> UpdateFriendshipAsync(Friendship friendship); // Per accettare/rifiutare richieste
        Task<bool> DeleteFriendshipAsync(int friendshipId);
        public bool CheckRequestExists(int userId1, int userId2);
    }
}

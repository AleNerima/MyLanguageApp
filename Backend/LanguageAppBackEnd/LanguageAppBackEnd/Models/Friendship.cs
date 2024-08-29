using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace LanguageAppBackEnd.Models
{
    public class Friendship
    {
        [Key]
        public int FriendshipId { get; set; }

        [ForeignKey("User1")]
        public int UserId1 { get; set; }
        public User User1 { get; set; }

        [ForeignKey("User2")]
        public int UserId2 { get; set; }
        public User User2 { get; set; }

        public DateTime StartedAt { get; set; } = DateTime.UtcNow;
    }
}

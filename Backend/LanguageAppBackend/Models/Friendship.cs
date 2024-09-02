using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace LanguageAppBackend.Models
{
    public class Friendship
    {
        [Key]
        public int FriendshipId { get; set; }

        [Required]
        public int UserId1 { get; set; }
        [Required]
        public int UserId2 { get; set; }

        public DateTime StartedAt { get; set; } = DateTime.Now;

        [JsonIgnore]
        [ForeignKey(nameof(UserId1))]
        public User User1 { get; set; }

        [JsonIgnore]
        [ForeignKey(nameof(UserId2))]
        public User User2 { get; set; }
    }
}

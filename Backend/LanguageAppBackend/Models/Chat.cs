using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace LanguageAppBackend.Models
{
    public class Chat
    {
        [Key]
        public int ChatId { get; set; }

        [Required]
        public int UserId1 { get; set; }

        [Required]
        public int UserId2 { get; set; }

        [JsonIgnore]
        [ForeignKey(nameof(UserId1))]
        public User User1 { get; set; }

        [JsonIgnore]
        [ForeignKey(nameof(UserId2))]
        public User User2 { get; set; }

        [JsonIgnore]
        public ICollection<ChatMessage> Messages { get; set; } = new List<ChatMessage>();
    }
}

using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace LanguageAppBackend.Models
{
    public class User
    {
        [Key]
        public int UserId { get; set; }

        [Required]
        [MaxLength(50)]
        public string Username { get; set; }

        [Required]
        [MaxLength(100)]
        public string Email { get; set; }

        [Required]
        [JsonIgnore]
        public string PasswordHash { get; set; }

        [Required]
        [MaxLength(50)]
        public string NativeLanguage { get; set; }

        [Required]
        [MaxLength(50)]
        public string TargetLanguage { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;

        [JsonIgnore]
        public ICollection<Deck> Decks { get; set; }
        [JsonIgnore]
        public ICollection<Post> Posts { get; set; }
        [JsonIgnore]
        public ICollection<Comment> Comments { get; set; }
        [JsonIgnore]
        public ICollection<Friendship> Friendships1 { get; set; } 
        [JsonIgnore]
        public ICollection<Friendship> Friendships2 { get; set; } 
        [JsonIgnore]
        public ICollection<Chat> ChatsAsUser1 { get; set; } 
        [JsonIgnore]
        public ICollection<Chat> ChatsAsUser2 { get; set; } 
        [JsonIgnore]
        public ICollection<MessageStatus> MessageStatuses { get; set; }
        [JsonIgnore]
        public ICollection<ChatMessage> SentMessages { get; set; } = new List<ChatMessage>();
        [JsonIgnore]
        public ICollection<ChatMessage> ReceivedMessages { get; set; } = new List<ChatMessage>();
        [JsonIgnore]
        public UserImage UserImage { get; set; }
    }

}

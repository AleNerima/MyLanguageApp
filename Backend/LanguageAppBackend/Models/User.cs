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
        public ICollection<Friendship> Friendships1 { get; set; } // Friendships where the user is the first user
        [JsonIgnore]
        public ICollection<Friendship> Friendships2 { get; set; } // Friendships where the user is the second user
        [JsonIgnore]
        public ICollection<Chat> ChatsAsUser1 { get; set; } // Chats where the user is the first participant
        [JsonIgnore]
        public ICollection<Chat> ChatsAsUser2 { get; set; } // Chats where the user is the second participant
    }

}

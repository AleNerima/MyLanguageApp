using System.ComponentModel.DataAnnotations;

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
        public string PasswordHash { get; set; }

        [Required]
        [MaxLength(50)]
        public string NativeLanguage { get; set; }

        [Required]
        [MaxLength(50)]
        public string TargetLanguage { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public ICollection<Deck> Decks { get; set; }
        public ICollection<Flashcard> Flashcards { get; set; }
        public ICollection<Post> Posts { get; set; }
        public ICollection<Comment> Comments { get; set; }
        public ICollection<Friendship> Friendships1 { get; set; } // Friendships where the user is the first user
        public ICollection<Friendship> Friendships2 { get; set; } // Friendships where the user is the second user
        public ICollection<Chat> ChatsAsUser1 { get; set; } // Chats where the user is the first participant
        public ICollection<Chat> ChatsAsUser2 { get; set; } // Chats where the user is the second participant
    }

}

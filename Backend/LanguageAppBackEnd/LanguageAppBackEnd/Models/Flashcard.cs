using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace LanguageAppBackEnd.Models
{
    public class Flashcard
    {
        [Key]
        public int CardId { get; set; }

        [Required]
        [StringLength(100)]
        public string Term { get; set; }

        [Required]
        [StringLength(255)]
        public string Definition { get; set; }

        [Required]
        public byte DifficultyLevel { get; set; }

        [ForeignKey("Deck")]
        public int DeckId { get; set; }
        public Deck Deck { get; set; }

        [ForeignKey("User")]
        public int UserId { get; set; }
        public User User { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}

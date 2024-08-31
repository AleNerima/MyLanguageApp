using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace LanguageAppBackend.Models
{
    public class Flashcard
    {
        [Key]
        public int CardId { get; set; }

        [Required]
        [MaxLength(100)]
        public string Term { get; set; }

        [Required]
        [MaxLength(255)]
        public string Definition { get; set; }

        [Required]
        public byte DifficultyLevel { get; set; }

        [Required]
        public int DeckId { get; set; }
       
        public DateTime CreatedAt { get; set; } = DateTime.Now;

        //gestione ripetizione card in base alla difficoltà
        public DateTime? NextReviewDate { get; set; }

        [ForeignKey(nameof(DeckId))]
        public Deck Deck { get; set; }

       }
}

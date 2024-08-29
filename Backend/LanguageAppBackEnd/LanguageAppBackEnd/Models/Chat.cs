using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

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

        [Required]
        [MaxLength(1000)]
        public string Message { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;

        [ForeignKey(nameof(UserId1))]
        public User User1 { get; set; }

        [ForeignKey(nameof(UserId2))]
        public User User2 { get; set; }
    }
}

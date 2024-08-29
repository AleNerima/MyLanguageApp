using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace LanguageAppBackEnd.Models
{
    public class Chat
    {
        [Key]
        public int ChatId { get; set; }

        [ForeignKey("User1")]
        public int UserId1 { get; set; }
        public User User1 { get; set; }

        [ForeignKey("User2")]
        public int UserId2 { get; set; }
        public User User2 { get; set; }

        [Required]
        [StringLength(1000)]
        public string Message { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}

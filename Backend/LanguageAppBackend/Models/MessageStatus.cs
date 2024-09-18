using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LanguageAppBackend.Models
{
    public class MessageStatus
    {
        [Key]
        public int MessageStatusId { get; set; }

        [Required]
        public int MessageId { get; set; }

        [Required]
        public int UserId { get; set; }

        public bool IsRead { get; set; } = false;

        [ForeignKey(nameof(MessageId))]
        public ChatMessage ChatMessage { get; set; }

        [ForeignKey(nameof(UserId))]
        public User User { get; set; }
    }
}

using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace LanguageAppBackend.Models
{
    public class Post
    {
        [Key]
        public int PostId { get; set; }

        [Required]
        [MaxLength(1000)]
        public string Content { get; set; }

        [Required]
        [MaxLength(50)]
        public string Language { get; set; }

        [Required]
        public int UserId { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;

        [JsonIgnore]
        [ForeignKey(nameof(UserId))]
        public User User { get; set; }
        [JsonIgnore]
        public ICollection<Comment> Comments { get; set; }
    }
}

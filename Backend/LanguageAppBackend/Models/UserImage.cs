using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LanguageAppBackend.Models
{
    public class UserImage
    {
        [Key]
        public int UserImageId { get; set; }

        [Required]
        public int UserId { get; set; }  

        [Required]
        [MaxLength(10485760)]  // Limite di 10MB
        public string ImageData { get; set; }  // Immagine in Base64

        public DateTime UploadedAt { get; set; } = DateTime.Now;

        [ForeignKey("UserId")]
        public User User { get; set; }
    }
}

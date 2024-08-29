using System.ComponentModel.DataAnnotations;

namespace LanguageAppBackEnd.Models
{
    public class User
    {
        [Key]
        public int UserId { get; set; }

        [Required]
        [StringLength(50)]
        public string Username { get; set; }

        [Required]
        [StringLength(100)]
        public string Email { get; set; }

        [Required]
        [StringLength(256)]
        public string PasswordHash { get; set; }

        [Required]
        [StringLength(50)]
        public string NativeLanguage { get; set; }

        [Required]
        [StringLength(50)]
        public string StudiedLanguage { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}

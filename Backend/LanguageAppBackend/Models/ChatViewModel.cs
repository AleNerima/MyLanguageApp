namespace LanguageAppBackend.Models
{
    using System.ComponentModel.DataAnnotations;

    public class ChatViewModel
    {
        [Required]
        public int UserId1 { get; set; }

        [Required]
        public int UserId2 { get; set; }

        [Required]
        [MaxLength(1000)]
        public string Message { get; set; }
    }

}

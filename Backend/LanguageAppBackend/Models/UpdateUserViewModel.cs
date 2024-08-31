namespace LanguageAppBackend.Models
{
    public class UpdateUserViewModel
    {
        public int UserId { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public string NativeLanguage { get; set; }
        public string TargetLanguage { get; set; }
    }
}

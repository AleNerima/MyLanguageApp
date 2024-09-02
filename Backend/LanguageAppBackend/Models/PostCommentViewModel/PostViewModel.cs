namespace LanguageAppBackend.Models.PostCommentViewModel
{
    public class PostViewModel
    {
        public string Content { get; set; }

        public string Language { get; set; }

        // Questo campo sarà popolato nel controller usando i claims
        public int UserId { get; set; }
    }

}

namespace LanguageAppBackend.Models.PostCommentViewModel
{
    public class CommentViewModel
    {
        public string Content { get; set; }

        // Questo campo sarà popolato nel controller usando i claims
        public int UserId { get; set; }

        // ID del Post a cui il commento è associato
        public int PostId { get; set; }
    }
}

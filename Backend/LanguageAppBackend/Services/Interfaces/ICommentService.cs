using LanguageAppBackend.Models;
using LanguageAppBackend.Models.PostCommentViewModel;

namespace LanguageAppBackend.Services.Interfaces
{
    public interface ICommentService
    {
        Task<Comment> CreateCommentAsync(CommentViewModel commentViewModel);
        Task<Comment> UpdateCommentAsync(int commentId, CommentViewModel commentViewModel);
        Task<bool> DeleteCommentAsync(int commentId);
        Task<Comment> GetCommentByIdAsync(int commentId);
        Task<IEnumerable<Comment>> GetCommentsByPostIdAsync(int postId);
    }

}

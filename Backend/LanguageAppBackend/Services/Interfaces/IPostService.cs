using LanguageAppBackend.Models;
using LanguageAppBackend.Models.PostCommentViewModel;

namespace LanguageAppBackend.Services.Interfaces
{
    public interface IPostService
    {
        Task<Post> CreatePostAsync(PostViewModel postViewModel);
        Task<Post> UpdatePostAsync(int postId, PostViewModel postViewModel);
        Task<bool> DeletePostAsync(int postId);
        Task<Post> GetPostByIdAsync(int postId);
        Task<IEnumerable<Post>> GetAllPostsAsync();
    }

}

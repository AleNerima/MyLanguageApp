using LanguageAppBackend.Data;
using LanguageAppBackend.Models;
using LanguageAppBackend.Models.PostCommentViewModel;
using LanguageAppBackend.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace LanguageAppBackend.Services
{
    public class CommentService : ICommentService
    {
        private readonly ApplicationDbContext _context;

        public CommentService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Comment> CreateCommentAsync(CommentViewModel commentViewModel)
        {
            var comment = new Comment
            {
                Content = commentViewModel.Content,
                PostId = commentViewModel.PostId,
                UserId = commentViewModel.UserId,
                CreatedAt = DateTime.Now
            };

            _context.Comments.Add(comment);
            await _context.SaveChangesAsync();

            return comment;
        }

        public async Task<Comment> UpdateCommentAsync(int commentId, CommentViewModel commentViewModel)
        {
            var comment = await _context.Comments.FindAsync(commentId);

            if (comment == null)
            {
                return null;
            }

            comment.Content = commentViewModel.Content;

            await _context.SaveChangesAsync();

            return comment;
        }

        public async Task<bool> DeleteCommentAsync(int commentId)
        {
            var comment = await _context.Comments.FindAsync(commentId);

            if (comment == null)
            {
                return false;
            }

            _context.Comments.Remove(comment);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<Comment> GetCommentByIdAsync(int commentId)
        {
            return await _context.Comments.FindAsync(commentId);
        }

        public async Task<IEnumerable<Comment>> GetCommentsByPostIdAsync(int postId)
        {
            return await _context.Comments
                .Where(c => c.PostId == postId)
                .ToListAsync();
        }
    }

}

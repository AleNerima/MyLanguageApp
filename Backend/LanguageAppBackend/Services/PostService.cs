﻿using LanguageAppBackend.Data;
using LanguageAppBackend.Models;
using LanguageAppBackend.Models.PostCommentViewModel;
using LanguageAppBackend.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace LanguageAppBackend.Services
{
    public class PostService : IPostService
    {
        private readonly ApplicationDbContext _context;

        public PostService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Post> CreatePostAsync(PostViewModel postViewModel)
        {
            var post = new Post
            {
                Content = postViewModel.Content,
                Language = postViewModel.Language,
                UserId = postViewModel.UserId,
                CreatedAt = DateTime.Now
            };

            _context.Posts.Add(post);
            await _context.SaveChangesAsync();

            return post;
        }

        public async Task<Post> UpdatePostAsync(int postId, PostViewModel postViewModel)
        {
            var post = await _context.Posts.FindAsync(postId);

            if (post == null)
            {
                return null;
            }

            post.Content = postViewModel.Content;
            post.Language = postViewModel.Language;

            await _context.SaveChangesAsync();

            return post;
        }

        public async Task<bool> DeletePostAsync(int postId)
        {
            var post = await _context.Posts.FindAsync(postId);

            if (post == null)
            {
                return false;
            }

            _context.Posts.Remove(post);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<Post> GetPostByIdAsync(int postId)
        {
            return await _context.Posts
                .Include(p => p.Comments)
                .SingleOrDefaultAsync(p => p.PostId == postId);
        }

        public async Task<IEnumerable<Post>> GetAllPostsAsync()
        {
            return await _context.Posts
                .Include(p => p.Comments)
                .ToListAsync();
        }
    }

}

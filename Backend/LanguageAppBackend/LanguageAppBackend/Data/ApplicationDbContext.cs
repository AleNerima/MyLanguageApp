﻿using Microsoft.EntityFrameworkCore;
using LanguageAppBackend.Models; 

namespace LanguageAppBackend.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Deck> Decks { get; set; }
        public DbSet<Flashcard> Flashcards { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Friendship> Friendships { get; set; }
        public DbSet<Chat> Chats { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configuring the relationships for Friendship
            modelBuilder.Entity<Friendship>()
                .HasOne(f => f.User1)
                .WithMany(u => u.Friendships1)
                .HasForeignKey(f => f.UserId1)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Friendship>()
                .HasOne(f => f.User2)
                .WithMany(u => u.Friendships2)
                .HasForeignKey(f => f.UserId2)
                .OnDelete(DeleteBehavior.Restrict);

            // Configuring the relationships for Chat
            modelBuilder.Entity<Chat>()
                .HasOne(c => c.User1)
                .WithMany(u => u.ChatsAsUser1)
                .HasForeignKey(c => c.UserId1)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Chat>()
                .HasOne(c => c.User2)
                .WithMany(u => u.ChatsAsUser2)
                .HasForeignKey(c => c.UserId2)
                .OnDelete(DeleteBehavior.Restrict);

            // Configuring the relationships for Deck
            modelBuilder.Entity<Deck>()
                .HasOne(d => d.User)
                .WithMany(u => u.Decks)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            // Configuring the relationships for Flashcard
            modelBuilder.Entity<Flashcard>()
                .HasOne(f => f.Deck)
                .WithMany(d => d.Flashcards)
                .HasForeignKey(f => f.DeckId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Flashcard>()
                .HasOne(f => f.User)
                .WithMany(u => u.Flashcards)
                .HasForeignKey(f => f.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            // Configuring the relationships for Post
            modelBuilder.Entity<Post>()
                .HasOne(p => p.User)
                .WithMany(u => u.Posts)
                .HasForeignKey(p => p.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            // Configuring the relationships for Comment
            modelBuilder.Entity<Comment>()
                .HasOne(c => c.Post)
                .WithMany(p => p.Comments)
                .HasForeignKey(c => c.PostId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Comment>()
                .HasOne(c => c.User)
                .WithMany(u => u.Comments)
                .HasForeignKey(c => c.UserId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}

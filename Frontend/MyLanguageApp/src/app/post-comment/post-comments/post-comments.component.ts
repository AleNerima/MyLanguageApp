import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentService } from '../../service/comment.service';
import { Icomment } from '../../Interfaces/icomment';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-post-comments',
  templateUrl: './post-comments.component.html',
  styleUrls: ['./post-comments.component.scss']
})
export class PostCommentsComponent implements OnInit {
  @Input() postId!: number;
  comments: Icomment[] = [];
  commentForm: FormGroup;
  currentUserId: number | null = null;

  constructor(
    private commentService: CommentService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.commentForm = this.fb.group({
      content: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.currentUserId = this.authService.getCurrentUser()?.userId || null;
    this.loadComments();
  }

  loadComments(): void {
    if (this.postId) {
      this.commentService.getComments(this.postId).subscribe(
        comments => this.comments = comments,
        error => console.error('Error loading comments:', error)
      );
    }
  }

  onSubmitComment(): void {
    if (this.commentForm.valid && this.currentUserId !== null) {
      const newComment: Icomment = {
        commentId: 0, // Il backend gestirà l'ID
        postId: this.postId,
        userId: this.currentUserId,
        content: this.commentForm.value.content,
        createdAt: new Date().toISOString() // Usa ISO string per la compatibilità
      };

      this.commentService.addComment(newComment).subscribe(
        comment => {
          this.comments.push(comment);
          this.commentForm.reset();
        },
        error => console.error('Error adding comment:', error)
      );
    }
  }

  onEditComment(comment: Icomment): void {
    if (this.currentUserId !== null && comment.userId === this.currentUserId) {
      const updatedContent = prompt('Edit your comment:', comment.content);
      if (updatedContent !== null) {
        const updatedComment: Icomment = { ...comment, content: updatedContent };

        this.commentService.updateComment(comment.commentId, updatedComment).subscribe(
          updated => {
            const index = this.comments.findIndex(c => c.commentId === updated.commentId);
            if (index !== -1) {
              this.comments[index] = updated;
            }
          },
          error => console.error('Error updating comment:', error)
        );
      }
    }
  }

  onDeleteComment(commentId: number): void {
    if (confirm('Are you sure you want to delete this comment?')) {
      this.commentService.deleteComment(commentId).subscribe(
        () => {
          this.comments = this.comments.filter(c => c.commentId !== commentId);
        },
        error => console.error('Error deleting comment:', error)
      );
    }
  }
}

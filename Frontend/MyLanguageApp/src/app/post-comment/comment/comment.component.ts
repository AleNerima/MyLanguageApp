import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from '../../service/comment.service';
import { Icomment } from '../../Interfaces/icomment';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() postId!: number;  // Usa postId come input
  comments: Icomment[] = [];
  newComment: string = '';

  constructor(
    private commentService: CommentService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (this.postId) {
      this.loadComments();
    } else {
      console.error('Post ID is undefined');
    }
  }

  loadComments(): void {
    if (!this.postId) {
      console.error('Post ID is undefined');
      return;
    }
    this.commentService.getCommentsByPostId(this.postId).subscribe((comments) => {
      this.comments = comments;
    }, error => {
      console.error('Error loading comments:', error);
    });
  }

  addComment(): void {
    if (!this.newComment) return;

    const user = this.authService.getCurrentUser();
    if (!user) {
      console.error('User not logged in');
      return;
    }

    const comment: Icomment = {
      commentId: 0,
      content: this.newComment,
      postId: this.postId,  // Usa postId
      userId: user.userId,
      createdAt: new Date()
    };

    this.commentService.createComment(comment).subscribe((newComment) => {
      this.comments.push(newComment);
      this.newComment = '';
    }, error => {
      console.error('Error adding comment:', error);
    });
  }

  deleteComment(commentId: number): void {
    this.commentService.deleteComment(commentId).subscribe(() => {
      this.comments = this.comments.filter(c => c.commentId !== commentId);
    }, error => {
      console.error('Error deleting comment:', error);
    });
  }
}

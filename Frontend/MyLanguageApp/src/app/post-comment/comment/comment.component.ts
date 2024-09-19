import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from '../../service/comment.service';
import { Icomment } from '../../Interfaces/icomment';
import { AuthService } from '../../auth/auth.service';
import { UserService } from '../../service/users.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() postId!: number;
  comments: Icomment[] = [];
  newComment: string = '';
  currentUserId: number = 0;
  userMap: Map<number, string> = new Map();

  constructor(
    private commentService: CommentService,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    if (this.postId) {
      this.loadComments();
      this.currentUserId = this.authService.getCurrentUser()?.userId || 0;
    } else {
      console.error('Post ID is undefined');
    }
  }

  loadComments(): void {
    if (!this.postId) {
      console.error('Post ID is undefined');
      return;
    }

    this.commentService.getCommentsByPostId(this.postId).subscribe(comments => {
      this.comments = comments;
      this.loadUsernames(); // Carica gli username dopo aver caricato i commenti
    }, error => {
      console.error('Error loading comments:', error);
    });
  }

  loadUsernames(): void {
    const userIds = this.comments.map(comment => comment.userId);
    if (userIds.length === 0) return;

    this.userService.getUsersByIds(userIds).subscribe(users => {
      this.userMap = new Map(users.map(user => [user.userId, user.username]));
    }, error => {
      console.error('Error loading user data:', error);
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
      postId: this.postId,
      userId: user.userId,
      createdAt: new Date()
    };

    this.commentService.createComment(comment).subscribe(newComment => {
      this.comments.push(newComment);
      this.newComment = '';
      this.loadUsernames(); // Ricarica gli username dopo aver aggiunto un commento
    }, error => {
      console.error('Error adding comment:', error);
    });
  }

  deleteComment(commentId: number): void {
    const comment = this.comments.find(c => c.commentId === commentId);
    if (comment && comment.userId === this.currentUserId) {
      this.commentService.deleteComment(commentId).subscribe(() => {
        this.comments = this.comments.filter(c => c.commentId !== commentId);
        this.loadUsernames(); // Ricarica gli username dopo aver eliminato un commento
      }, error => {
        console.error('Error deleting comment:', error);
      });
    } else {
      console.error('Not authorized to delete this comment.');
    }
  }

  getUsername(userId: number): string {
    return this.userMap.get(userId) || 'Unknown';
  }
}

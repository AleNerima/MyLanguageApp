import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from '../../service/post.service';
import { UserService } from '../../service/users.service';
import { Ipost } from '../../Interfaces/ipost';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  posts: Ipost[] = [];
  filteredPosts: Ipost[] = [];
  filterForm: FormGroup;
  users: { [id: number]: string } = {};
  currentUserId: number = 0; // Aggiungi per tenere traccia dell'ID dell'utente corrente

  constructor(
    private postService: PostService,
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private authService: AuthService // Aggiungi il servizio Auth
  ) {
    this.filterForm = this.fb.group({
      startDate: [''],
      endDate: [''],
      language: ['']
    });
  }

  ngOnInit(): void {
    this.currentUserId = this.authService.getCurrentUser()?.userId || 0; // Ottieni l'ID dell'utente corrente
    this.loadPosts();
  }

  loadPosts(): void {
    this.postService.getPosts().subscribe(
      posts => {
        this.posts = posts;
        this.filteredPosts = posts;
        this.loadUsers();
      },
      error => console.error('Error loading posts:', error)
    );
  }

  loadUsers(): void {
    const userIds = Array.from(new Set(this.posts.map(post => post.userId)));
    userIds.forEach(userId => {
      this.userService.getUser(userId).subscribe(
        user => this.users[userId] = user.username,
        error => console.error('Error loading user:', error)
      );
    });
  }

  applyFilters(): void {
    const startDate = this.filterForm.value.startDate ? new Date(this.filterForm.value.startDate) : null;
    const endDate = this.filterForm.value.endDate ? new Date(this.filterForm.value.endDate) : null;
    const language = this.filterForm.value.language?.trim().toLowerCase() || '';

    this.filteredPosts = this.posts.filter(post => {
      const postDate = new Date(post.createdAt);
      const isDateInRange = !startDate || !endDate || (postDate >= startDate && postDate <= endDate);
      const matchesLanguage = !language || post.language.trim().toLowerCase() === language;

      return isDateInRange && matchesLanguage;
    });
  }

  onFilterSubmit(): void {
    const filter = {
      startDate: this.filterForm.value.startDate ? new Date(this.filterForm.value.startDate) : undefined,
      endDate: this.filterForm.value.endDate ? new Date(this.filterForm.value.endDate) : undefined,
      language: this.filterForm.value.language || undefined
    };

    this.postService.getPosts(filter).subscribe(
      posts => {
        this.posts = posts;
        this.applyFilters();
      },
      error => console.error('Error loading posts:', error)
    );
  }

  navigateToCreatePost(): void {
    this.router.navigate(['/posts/create']);
  }

  getAuthorName(userId: number): string {
    return this.users[userId] || 'Unknown';
  }

  deletePost(postId: number): void {
    if (this.currentUserId) {
      this.postService.getPost(postId).subscribe(post => {
        if (post.userId === this.currentUserId) {
          this.postService.deletePost(postId).subscribe(
            () => {
              this.posts = this.posts.filter(post => post.postId !== postId);
              this.filteredPosts = this.filteredPosts.filter(post => post.postId !== postId);
            },
            error => console.error('Error deleting post:', error)
          );
        } else {
          console.error('Non autorizzato a eliminare questo post.');
        }
      });
    }
  }
}

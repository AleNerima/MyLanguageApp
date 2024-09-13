import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from '../../service/post.service';
import { UserService } from '../../service/users.service';
import { Ipost } from '../../Interfaces/ipost';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  posts: Ipost[] = [];
  filteredPosts: Ipost[] = []; // Array per i post filtrati
  filterForm: FormGroup;
  users: { [id: number]: string } = {}; // Mappa per memorizzare gli username

  constructor(
    private postService: PostService,
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
    this.filterForm = this.fb.group({
      startDate: [''],
      endDate: [''],
      language: ['']
    });
  }

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.postService.getPosts().subscribe(
      posts => {
        console.log('All posts:', posts); // Verifica che tutti i post siano caricati correttamente
        this.posts = posts;
        this.filteredPosts = posts;
        this.loadUsers();
      },
      error => console.error('Error loading posts:', error)
    );
  }


  loadUsers(): void {
    // Carica gli utenti se necessario per ottenere gli username
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

    console.log('Applying filters with values:', { startDate, endDate, language });

    this.filteredPosts = this.posts.filter(post => {
      const postDate = new Date(post.createdAt);
      const isDateInRange = !startDate || !endDate || (postDate >= startDate && postDate <= endDate);
      const matchesLanguage = !language || post.language.trim().toLowerCase() === language;

      console.log('Post:', post, 'Date in range:', isDateInRange, 'Matches language:', matchesLanguage);

      return isDateInRange && matchesLanguage;
    });

    console.log('Filtered posts:', this.filteredPosts);
  }





  onFilterSubmit(): void {
    const filter = {
      startDate: this.filterForm.value.startDate ? new Date(this.filterForm.value.startDate) : undefined,
      endDate: this.filterForm.value.endDate ? new Date(this.filterForm.value.endDate) : undefined,
      language: this.filterForm.value.language || undefined
    };

    this.postService.getPosts(filter).subscribe(
      posts => {
        console.log('Posts received:', posts); // Aggiungi questo per il debug
        this.posts = posts;
        this.applyFilters(); // Applica il filtraggio sul frontend
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
    this.postService.deletePost(postId).subscribe(
      () => {
        // Rimuovi il post dalla lista dei post
        this.posts = this.posts.filter(post => post.postId !== postId);
        this.filteredPosts = this.filteredPosts.filter(post => post.postId !== postId);
      },
      error => console.error('Error deleting post:', error)
    );
  }
}

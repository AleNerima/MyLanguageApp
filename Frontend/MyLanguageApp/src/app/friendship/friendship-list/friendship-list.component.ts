// friendship-list.component.ts
import { Component, OnInit } from '@angular/core';
import { FriendshipService } from '../../service/friendship.service';
import { UserService } from '../../service/users.service';
import { AuthService } from '../../auth/auth.service';
import { IFriendship } from '../../Interfaces/ifriendship';
import { IUsers } from '../../Interfaces/iusers';

@Component({
  selector: 'app-friendship',
  templateUrl: './friendship-list.component.html',
  styleUrls: ['./friendship-list.component.scss']
})
export class FriendshipListComponent implements OnInit {
  friendships: IFriendship[] = [];
  pendingRequests: IFriendship[] = [];
  userId: number = 0;
  users: Map<number, IUsers> = new Map(); // Mappa per memorizzare i dettagli degli utenti
  isLoading: boolean = true;
  errorMessage: string | null = null;

  constructor(
    private friendshipService: FriendshipService,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.userId = currentUser.userId;
      this.loadFriendships();
      this.loadPendingRequests();
    }
  }

  loadFriendships(): void {
    this.friendshipService.getFriendships(this.userId).subscribe(
      friendships => {
        this.friendships = friendships;
        this.loadUserDetails(friendships);
      },
      error => {
        console.error('Error loading friendships:', error);
        this.errorMessage = 'Error loading friendships';
        this.isLoading = false;
      }
    );
  }

  loadPendingRequests(): void {
    this.friendshipService.getPendingFriendships(this.userId).subscribe(
      pendingRequests => {
        this.pendingRequests = pendingRequests;
        this.loadUserDetails(pendingRequests);
      },
      error => {
        console.error('Error loading pending requests:', error);
        this.errorMessage = 'Error loading pending requests';
        this.isLoading = false;
      }
    );
  }

  loadUserDetails(friendships: IFriendship[]): void {
    const userIds = new Set<number>();
    friendships.forEach(friendship => {
      userIds.add(friendship.userId1);
      userIds.add(friendship.userId2);
    });

    userIds.forEach(userId => {
      this.userService.getUser(userId).subscribe(
        user => this.users.set(userId, user),
        error => {
          console.error('Error loading user details:', error);
          this.errorMessage = 'Error loading user details';
        }
      );
    });

    // After all requests are done
    this.isLoading = false;
  }

  acceptRequest(friendshipId: number): void {
    this.friendshipService.acceptFriendRequest(friendshipId).subscribe(
      () => {
        this.loadFriendships();
        this.loadPendingRequests();
      },
      error => console.error('Error accepting friend request:', error)
    );
  }

  rejectRequest(friendshipId: number): void {
    this.friendshipService.rejectFriendRequest(friendshipId).subscribe(
      () => {
        this.loadFriendships();
        this.loadPendingRequests();
      },
      error => console.error('Error rejecting friend request:', error)
    );
  }

  getUserName(userId: number): string {
    const user = this.users.get(userId);
    return user ? user.username : 'Unknown';
  }
}

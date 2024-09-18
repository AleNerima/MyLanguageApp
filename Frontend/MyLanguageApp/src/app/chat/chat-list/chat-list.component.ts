// src/app/chat/chat-list/chat-list.component.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FriendshipService } from '../../service/friendship.service';
import { UserService } from '../../service/users.service';
import { AuthService } from '../../auth/auth.service';
import { ChatService } from '../../service/chat.service';
import { IUsers } from '../../Interfaces/iusers';
import { IFriendship } from '../../Interfaces/ifriendship';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit {
  friends: IUsers[] = [];
  userId: number = 0;
  isLoading: boolean = true;
  errorMessage: string | null = null;

  constructor(
    private friendshipService: FriendshipService,
    private userService: UserService,
    private authService: AuthService,
    private chatService: ChatService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUserId();
    this.loadFriends();
  }

  loadUserId(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.userId = currentUser.userId;
    } else {
      this.errorMessage = 'Utente non loggato.';
      this.isLoading = false;
    }
  }

  loadFriends(): void {
    if (this.userId) {
      this.friendshipService.getFriendships(this.userId).subscribe(
        (friendships: IFriendship[]) => {
          const friendIds = friendships.map(f => f.userId1 === this.userId ? f.userId2 : f.userId1);
          this.loadUserDetails(friendIds);
        },
        (error) => {
          console.error('Errore durante il caricamento delle amicizie:', error);
          this.errorMessage = 'Si è verificato un errore durante il caricamento delle amicizie.';
          this.isLoading = false;
        }
      );
    }
  }

  loadUserDetails(userIds: number[]): void {
    if (userIds.length > 0) {
      this.userService.getUsersByIds(userIds).subscribe(
        (users: IUsers[]) => {
          this.friends = users;
          this.isLoading = false;
        },
        (error) => {
          console.error('Errore durante il caricamento dei dettagli degli utenti:', error);
          this.errorMessage = 'Si è verificato un errore durante il caricamento dei dettagli degli utenti.';
          this.isLoading = false;
        }
      );
    } else {
      this.isLoading = false;
    }
  }

  selectChat(friendId: number): void {
    if (this.userId) {
      this.chatService.getChatId(this.userId, friendId).subscribe(
        (chatId: number) => {
          this.router.navigate(['chat-conversation', chatId]);
        },
        (error) => {
          console.error('Errore durante il recupero del chatId:', error);
        }
      );
    }
  }
}

// other-users-profile.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../service/users.service';
import { FriendshipService } from '../../service/friendship.service';
import { IUsers } from '../../Interfaces/iusers';
import { IFriendship } from '../../Interfaces/ifriendship';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-other-user-profile',
  templateUrl: './other-users-profile.component.html',
  styleUrls: ['./other-users-profile.component.scss']
})
export class OtherUserProfileComponent implements OnInit {
  user: IUsers | null = null;
  isLoading = true;
  errorMessage: string | null = null;
  isFriend = false;
  isFriendRequestSent = false;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private friendshipService: FriendshipService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const userId = params.get('userId'); // Ottieni l'ID come stringa

      if (userId) {
        this.userService.getUser(+userId).subscribe(
          (userData: IUsers) => {
            this.user = userData;
            this.isLoading = false;
            this.checkFriendshipStatus(+userId);
          },
          (error) => {
            console.error('Errore durante il caricamento del profilo:', error);
            this.errorMessage = 'Si è verificato un errore durante il caricamento del profilo.';
            this.isLoading = false;
          }
        );
      } else {
        this.errorMessage = 'ID utente non trovato.';
        this.isLoading = false;
      }
    });
  }

  sendFriendRequest(): void {
    const currentUser = this.authService.getCurrentUser();

    if (!currentUser) {
      console.error('Utente non loggato');
      this.errorMessage = 'Non sei loggato.';
      return;
    }

    if (this.user) {
      const currentUserId = currentUser.userId;
      const targetUserId = this.user.userId; // Usa un'altra variabile per migliorare la leggibilità

      this.friendshipService.checkFriendRequest(currentUserId, targetUserId).subscribe(
        (exists) => {
          if (exists) {
            console.error('Richiesta di amicizia già esistente');
            this.errorMessage = 'Hai già inviato una richiesta di amicizia a questo utente.';
            return;
          }

          this.friendshipService.sendFriendRequest({ userId1: currentUserId, userId2: targetUserId }).subscribe(
            (response) => {
              console.log('Richiesta di amicizia inviata:', response);
              this.checkFriendshipStatus(targetUserId); // Ricarica lo stato dell'amicizia
            },
            (error) => {
              console.error('Errore durante l\'invio della richiesta di amicizia:', error);
              this.errorMessage = 'Si è verificato un errore durante l\'invio della richiesta di amicizia.';
            }
          );
        },
        (error) => {
          console.error('Errore durante il controllo della richiesta esistente:', error);
          this.errorMessage = 'Si è verificato un errore durante il controllo della richiesta di amicizia.';
        }
      );
    } else {
      console.error('User is null or undefined');
    }
  }


  private checkFriendshipStatus(userId: number): void {
    const currentUser = this.authService.getCurrentUser();

    if (!currentUser) {
      console.error('Utente non loggato');
      this.errorMessage = 'Non sei loggato.';
      return;
    }

    const currentUserId = currentUser.userId;

    this.friendshipService.getFriendships(currentUserId).subscribe(
      (response) => {
        // Verifica che 'response' sia un array
        if (Array.isArray(response)) {
          const friendship = response.find(f =>
            (f.userId1 === currentUserId && f.userId2 === userId) ||
            (f.userId1 === userId && f.userId2 === currentUserId)
          );

          if (friendship) {
            this.isFriend = friendship.status === 1; // Assume '1' for 'Accepted'
            this.isFriendRequestSent = friendship.status === 0 && friendship.userId1 === currentUserId; // Assume '0' for 'Pending'
          } else {
            this.isFriend = false;
            this.isFriendRequestSent = false;
          }
        } else {
          console.error('I dati restituiti dall\'API non sono un array:', response);
          this.errorMessage = 'Errore nei dati dell\'amicizia ricevuti.';
        }
      },
      (error) => {
        console.error('Errore durante il controllo dello stato dell\'amicizia:', error);
        this.errorMessage = 'Si è verificato un errore durante il controllo dello stato dell\'amicizia.';
      }
    );
  }

}

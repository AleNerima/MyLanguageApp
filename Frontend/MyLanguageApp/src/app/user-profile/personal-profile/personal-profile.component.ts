import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/users.service';
import { IUsers } from '../../Interfaces/iusers';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-personal-profile',
  templateUrl: './personal-profile.component.html',
  styleUrls: ['./personal-profile.component.scss']
})
export class PersonalProfileComponent implements OnInit {
  user: IUsers | null = null;
  isLoading = true; // Stato di caricamento
  errorMessage: string | null = null; // Per gestire gli errori

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.route.paramMap.subscribe(params => {
      const userId = params.get('userId'); // Ottieni l'ID come stringa

      if (userId) {
        // Carica il profilo per un altro utente
        this.userService.getUser(+userId).subscribe(
          (userData: IUsers) => {
            this.user = userData;
            this.isLoading = false;
          },
          (error) => {
            console.error('Errore durante il caricamento del profilo:', error);
            this.errorMessage = 'Si è verificato un errore durante il caricamento del profilo.';
            this.isLoading = false;
          }
        );
      } else {
        // Se non c'è userId nella rotta, carica il profilo dell'utente loggato
        const currentUser = this.authService.getCurrentUser();
        if (currentUser) {
          this.userService.getUser(currentUser.userId).subscribe(
            (userData: IUsers) => {
              this.user = userData;
              this.isLoading = false;
            },
            (error) => {
              console.error('Errore durante il caricamento del profilo:', error);
              this.errorMessage = 'Si è verificato un errore durante il caricamento del profilo.';
              this.isLoading = false;
            }
          );
        } else {
          console.error('Utente non loggato o dati mancanti');
          this.errorMessage = 'Utente non loggato o dati mancanti.';
          this.isLoading = false;
        }
      }
    });
  }
}

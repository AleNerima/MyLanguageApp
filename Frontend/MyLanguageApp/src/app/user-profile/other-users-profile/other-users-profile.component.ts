import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../service/users.service';
import { IUsers } from '../../Interfaces/iusers';

@Component({
  selector: 'app-other-user-profile',
  templateUrl: './other-users-profile.component.html',
  styleUrls: ['./other-users-profile.component.scss']
})
export class OtherUserProfileComponent implements OnInit {
  user: IUsers | null = null;
  isLoading = true;
  errorMessage: string | null = null;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const userId = params.get('userId'); // Ottieni l'ID come stringa

      if (userId) {
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
        this.errorMessage = 'ID utente non trovato.';
        this.isLoading = false;
      }
    });
  }
}

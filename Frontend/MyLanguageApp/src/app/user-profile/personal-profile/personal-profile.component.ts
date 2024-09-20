import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/users.service';
import { IUsers } from '../../Interfaces/iusers';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { UserImageService } from '../../service/user-image.service';

@Component({
  selector: 'app-personal-profile',
  templateUrl: './personal-profile.component.html',
  styleUrls: ['./personal-profile.component.scss']
})
export class PersonalProfileComponent implements OnInit {
  user: IUsers | null = null;
  isLoading = true;
  errorMessage: string | null = null;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private userImageService: UserImageService // Iniezione del servizio di immagini
  ) {}

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
    console.log('Utente corrente:', currentUser);
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.route.paramMap.subscribe(params => {
      const userId = params.get('userId');

      if (userId) {
        this.fetchUserData(+userId);
      } else {
        const currentUser = this.authService.getCurrentUser();
        if (currentUser) {
          this.fetchUserData(currentUser.userId);
        } else {
          this.errorMessage = 'Utente non loggato o dati mancanti.';
          this.isLoading = false;
        }
      }
    });
  }

  fetchUserData(userId: number): void {
    this.userService.getUser(userId).subscribe(
      (userData: IUsers) => {
        console.log('Dati utente:', userData);
        this.user = userData;
        this.loadUserImage(userData.imageData); // Carica l'immagine qui
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'Errore durante il caricamento del profilo: ' + error;
        this.isLoading = false;
      }
    );
  }

  loadUserImage(imageData: string | null | undefined): void {
    console.log('Image data received:', imageData);
    this.user!.imageUrl = imageData && imageData.startsWith('data:image/jpeg;base64,')
      ? imageData
      : 'assets/images/defaultimage.png'; // Immagine di default
  }

  goToUploadImage(): void {
    this.router.navigate(['/upload-image']); // Naviga al componente di upload
  }
}

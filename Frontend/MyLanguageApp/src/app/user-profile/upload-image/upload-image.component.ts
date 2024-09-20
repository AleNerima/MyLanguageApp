import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { UserImageService } from '../../service/user-image.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent {
  selectedImage: File | null = null;
  errorMessage: string | null = null;

  constructor(
    private authService: AuthService,
    private userImageService: UserImageService,
    private router: Router // Aggiunta del Router
  ) {}

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.selectedImage = input.files[0];
      this.uploadImage(); // Carica l'immagine immediatamente dopo la selezione
    }
  }

  getBase64Image(): Promise<string | null> {
    return new Promise((resolve, reject) => {
      if (!this.selectedImage) {
        return resolve(null);
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = () => {
        reject('Errore durante la lettura del file');
      };
      reader.readAsDataURL(this.selectedImage);
    });
  }

  async uploadImage() {
    const userId = this.authService.getCurrentUserId();
    const base64Image = await this.getBase64Image();

    if (base64Image && userId !== null) {
      this.userImageService.uploadProfileImage(userId, base64Image).subscribe(
        response => {
          if (response && response.success) {
            // Immagine caricata con successo
            console.log('Immagine caricata con successo:', response);
            // Puoi aggiungere qui un messaggio di successo se necessario
            this.router.navigate(['/profile', userId]); // Torna al profilo
          } else {
            this.errorMessage = 'immagine caricata con successo';
          }
        },
        error => {
          this.errorMessage = 'immagine caricata';
        }
      );
    } else {
      this.errorMessage = 'Nessuna immagine selezionata.';
    }
  }

  goBackToProfile(): void {
    const userId = this.authService.getCurrentUserId();
    this.router.navigate(['UserProfile/profile']); // Torna al profilo
  }
}

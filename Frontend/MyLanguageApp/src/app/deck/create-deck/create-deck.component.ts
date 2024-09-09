import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DeckService } from '../../service/deck.service';
import { IDeck } from '../../Interfaces/i-deck';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-create-deck',
  templateUrl: './create-deck.component.html',
  styleUrls: ['./create-deck.component.scss']
})
export class CreateDeckComponent {
  deck: Partial<IDeck> = {
    name: '',
    description: '',
    userId: 0
  };

  constructor(
    private deckService: DeckService,
    private authService: AuthService,
    private router: Router
  ) { }

  createDeck(): void {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.deck.userId = user.userId;

      this.deckService.createDeck(this.deck as IDeck).subscribe(
        (data) => {
          console.log('Deck creato con successo:', data);
          this.router.navigate(['/Deck']);
        },
        (error) => console.error('Errore nella creazione del deck:', error)
      );
    } else {
      console.error('Utente non autenticato');
    }
  }
}

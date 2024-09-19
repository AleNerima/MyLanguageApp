import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeckService } from '../../service/deck.service';
import { IDeck } from '../../Interfaces/i-deck';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-edit-deck',
  templateUrl: './edit-deck.component.html',
  styleUrls: ['./edit-deck.component.scss']
})
export class EditDeckComponent implements OnInit {
  deck: IDeck | null = null;

  constructor(
    private route: ActivatedRoute,
    private deckService: DeckService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const deckId = Number(this.route.snapshot.paramMap.get('id'));
    if (deckId) {
      this.loadDeck(deckId);
    } else {
      console.error('ID del deck non valido');
      this.router.navigate(['/Deck']);
    }
  }

  loadDeck(deckId: number): void {
    this.deckService.getDeckById(deckId).subscribe(
      (data: IDeck) => {
        const user = this.authService.getCurrentUser();
        if (user && data.userId === user.userId) {
          this.deck = data;
        } else {
          console.error('Utente non autorizzato a modificare questo deck');
          this.router.navigate(['/Deck']);
        }
      },
      (error) => console.error('Errore nel caricamento del deck:', error)
    );
  }

  updateDeck(): void {
    if (this.deck) {
      this.deckService.updateDeck(this.deck).subscribe(
        (data) => {
          console.log('Deck aggiornato con successo:', data);
          this.router.navigate(['/Deck']);
        },
        (error) => console.error('Errore nell\'aggiornamento del deck:', error)
      );
    }
  }

  cancelEdit() {
    // Naviga alla pagina precedente utilizzando la cronologia del router
    this.router.navigate(['/Deck'], { relativeTo: this.route });
  }
}

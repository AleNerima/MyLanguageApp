import { Component, OnInit } from '@angular/core';
import { DeckService } from '../../service/deck.service';
import { IDeck } from '../../Interfaces/i-deck';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deck-list',
  templateUrl: './deck-list.component.html',
  styleUrls: ['./deck-list.component.scss']
})
export class DeckListComponent implements OnInit {
  decks: IDeck[] = []; // Assicurati che questo sia un array di IDeck

  constructor(
    private deckService: DeckService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadDecks();
  }

  loadDecks(): void {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.deckService.getDecksByUser(user.userId).subscribe(
        (response: any) => {
          console.log('Decks ricevuti:', response); // Verifica la struttura dei dati
          if (response && response.$values) {
            this.decks = response.$values; // Adatta la struttura dei dati
          } else {
            console.error('Struttura dei dati non prevista:', response);
          }
        },
        (error) => console.error('Errore nel caricamento dei deck', error)
      );
    } else {
      console.error('Utente non autenticato');
    }
  }

  deleteDeck(deckId: number): void {
    if (confirm('Sei sicuro di voler eliminare questo deck?')) {
      this.deckService.deleteDeck(deckId).subscribe(
        () => {
          this.loadDecks(); // Ricarica i deck dopo la cancellazione
          console.log('Deck eliminato con successo');
        },
        (error) => console.error('Errore nell\'eliminazione del deck', error)
      );
    }
  }

  editDeck(deckId: number): void {
    this.router.navigate([`/edit/${deckId}`]);
  }

  viewDeckDetails(deckId: number): void {
    this.router.navigate([`/detail/${deckId}`]); // Nuovo metodo per visualizzare i dettagli del deck
  }
}

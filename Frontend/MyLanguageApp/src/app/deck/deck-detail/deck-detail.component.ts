// deck-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeckService } from '../../service/deck.service';
import { FlashcardService } from '../../service/flashcard.service';
import { IDeck } from '../../Interfaces/i-deck';
import { IFlashcard } from '../../Interfaces/i-flashcard';

@Component({
  selector: 'app-deck-detail',
  templateUrl: './deck-detail.component.html',
  styleUrls: ['./deck-detail.component.scss']
})
export class DeckDetailComponent implements OnInit {
  deck: IDeck | null = null;
  flashcards: IFlashcard[] = [];

  constructor(
    private route: ActivatedRoute,
    private deckService: DeckService,
    private flashcardService: FlashcardService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadDeckDetails();
  }

  loadDeckDetails(): void {
    const deckId = this.route.snapshot.paramMap.get('id');
    if (deckId) {
      this.deckService.getDeckById(Number(deckId)).subscribe(
        (data) => {
          this.deck = data;
          this.loadFlashcards(); // Assicurati di caricare le flashcard
        },
        (error) => console.error('Errore nel caricamento dei dettagli del deck', error)
      );
    }
  }

  loadFlashcards(): void {
    const deckId = this.deck?.deckId;
    if (deckId) {
      this.flashcardService.getFlashcardsByDeck(deckId).subscribe(
        (response: any) => {
          // Se la risposta contiene una proprietà "$values", estrai l'array di flashcard
          if (response && response.$values) {
            this.flashcards = response.$values;
          } else if (Array.isArray(response)) {
            // Se la risposta è già un array, assegnala direttamente
            this.flashcards = response;
          } else {
            console.error('Struttura di risposta non prevista', response);
          }
        },
        (error) => console.error('Errore nel caricamento delle flashcard', error)
      );
    }
  }



  addFlashcard(): void {
    if (this.deck?.deckId) {
      this.router.navigate([`/flashcard/create/${this.deck.deckId}`]);
    }
  }

  viewFlashcards(): void {
    if (this.deck?.deckId) {
      this.router.navigate([`/flashcard/list/${this.deck.deckId}`]);
    }
  }

  viewDetails(flashcardId: number): void {
    // Naviga alla pagina dei dettagli della flashcard
    this.router.navigate(['/flashcard/detail', flashcardId]);
  }

  studyFlashcards(): void {
    if (this.deck?.deckId) {
      this.router.navigate([`/flashcard/study/${this.deck.deckId}`]);
    }
  }

  deleteFlashcard(flashcardId: number): void {
    if (confirm('Sei sicuro di voler eliminare questa flashcard?')) {
      this.flashcardService.deleteFlashcard(flashcardId).subscribe(
        () => this.loadFlashcards(),
        (error) => console.error('Errore nell\'eliminazione della flashcard', error)
      );
    }
  }
}

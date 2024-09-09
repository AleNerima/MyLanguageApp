// deck-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeckService } from '../../service/deck.service';
import { IDeck } from '../../Interfaces/i-deck';
import { IFlashcard } from '../../Interfaces/i-flashcard'; // Assicurati di avere una interfaccia per Flashcard

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
          this.flashcards = data.flashcards ? data.flashcards.$values : [];
        },
        (error) => console.error('Errore nel caricamento dei dettagli del deck', error)
      );
    }
  }

  startStudying(): void {
    // Logica per avviare lo studio delle flashcard
    console.log('Inizia a studiare le flashcard');
  }
}

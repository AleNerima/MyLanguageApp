// list-flashcard.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashcardService } from '../../service/flashcard.service';
import { IFlashcard } from '../../Interfaces/i-flashcard';

@Component({
  selector: 'app-list-flashcard',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListFlashcardComponent implements OnInit {
  flashcards: IFlashcard[] = [];
  deckId: number;

  constructor(
    private route: ActivatedRoute,
    private flashcardService: FlashcardService,
    private router: Router
  ) {
    this.deckId = +this.route.snapshot.paramMap.get('deckId')!;
  }

  ngOnInit(): void {
    this.loadFlashcards();
  }

  loadFlashcards(): void {
    this.flashcardService.getFlashcardsByDeck(this.deckId).subscribe(
      (flashcards) => this.flashcards = flashcards,
      (error) => console.error('Errore nel caricamento delle flashcard', error)
    );
  }

  editFlashcard(flashcardId: number): void {
    this.router.navigate([`/flashcard/edit/${flashcardId}`]);
  }

  viewFlashcard(flashcardId: number): void {
    this.router.navigate([`/flashcard/detail/${flashcardId}`]);
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

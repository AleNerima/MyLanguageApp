import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashcardService } from '../../service/flashcard.service';
import { IFlashcard } from '../../Interfaces/i-flashcard';

@Component({
  selector: 'app-detail-flashcard',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailFlashcardComponent implements OnInit {
  flashcard: IFlashcard | null = null;

  constructor(
    private route: ActivatedRoute,
    private flashcardService: FlashcardService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadFlashcard();
  }

  loadFlashcard(): void {
    const flashcardId = +this.route.snapshot.paramMap.get('id')!;
    this.flashcardService.getFlashcardById(flashcardId).subscribe(
      (flashcard) => this.flashcard = flashcard,
      (error) => console.error('Errore nel caricamento della flashcard', error)
    );
  }

  editFlashcard(): void {
    if (this.flashcard && this.flashcard.cardId !== undefined) {
      this.router.navigate(['/flashcard/edit', this.flashcard.cardId]);
    }
  }

  formatDate(date?: string | Date): string {
    let formattedDate: Date | null = null;

    // Se `date` è una stringa, proviamo a convertirla in un oggetto Date
    if (typeof date === 'string') {
      formattedDate = new Date(date);
    } else if (date instanceof Date) {
      formattedDate = date;
    }

    // Controlliamo se `formattedDate` è una data valida
    if (formattedDate && !isNaN(formattedDate.getTime())) {
      const localDate = new Date(formattedDate.getTime() - formattedDate.getTimezoneOffset() * 60000);
      return localDate.toLocaleString(); // Formatta come stringa locale
    }

    return 'Data non valida'; // Messaggio di fallback se la data non è valida
  }

  goBack() {
    this.router.navigate(['/Deck/detail', this.flashcard?.deckId]);
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashcardService } from '../../service/flashcard.service';
import { IFlashcard } from '../../Interfaces/i-flashcard';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  flashcard: IFlashcard | null = null;

  constructor(
    private route: ActivatedRoute,
    private flashcardService: FlashcardService,
    public router: Router
  ) { }

  ngOnInit(): void {
    const flashcardId = +this.route.snapshot.paramMap.get('id')!;
    if (isNaN(flashcardId)) {
      console.error('ID della flashcard non valido:', flashcardId);
      return;
    }

    this.flashcardService.getFlashcardById(flashcardId).subscribe(
      (flashcard) => {
        this.flashcard = flashcard;
      },
      (error) => console.error('Errore nel caricamento della flashcard', error)
    );
  }

  updateFlashcard(): void {
    if (this.flashcard) {
      this.flashcardService.updateFlashcard(this.flashcard).subscribe(
        () => {
          this.router.navigate(['/flashcard/detail', this.flashcard?.cardId]);
        },
        (error) => console.error('Errore nell\'aggiornamento della flashcard', error)
      );
    }
  }

  goBack() {
    this.router.navigate(['/flashcard/detail', this.flashcard?.cardId]);
  }


}

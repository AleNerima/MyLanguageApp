import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlashcardService } from '../../service/flashcard.service';
import { IFlashcard } from '../../Interfaces/i-flashcard';

@Component({
  selector: 'app-study-flashcard',
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.scss']
})
export class StudyFlashcardComponent implements OnInit {
  flashcards: IFlashcard[] = [];
  currentFlashcardIndex = 0;
  currentFlashcard: IFlashcard | null = null;
  isDefinitionVisible = false;
  isEmpty = false; // Variabile per controllare se non ci sono flashcard

  constructor(
    private route: ActivatedRoute,
    private flashcardService: FlashcardService
  ) { }

  ngOnInit(): void {
    this.loadFlashcards();
  }

  loadFlashcards(): void {
    const deckId = +this.route.snapshot.paramMap.get('deckId')!;
    if (isNaN(deckId)) {
        console.error('ID del mazzo non valido:', deckId);
        return;
    }

    this.flashcardService.getFlashcardsByDeck(deckId).subscribe(
        (response: any) => {
            console.log('Dati restituiti dal backend:', response);
            this.flashcards = response.$values || [];

            // Filtra le flashcard in base alla nextReviewDate
            const now = new Date();
            this.flashcards = this.flashcards.filter(fc => {
                if (!fc.nextReviewDate) {
                    return false;
                }

                // Converti la data di revisione da UTC a locale
                const reviewDateUTC = new Date(fc.nextReviewDate);
                const reviewDate = new Date(reviewDateUTC.getTime() - reviewDateUTC.getTimezoneOffset() * 60000);
                console.log('Data di revisione filtrata (locale):', reviewDate.toLocaleString());
                return reviewDate.getTime() <= now.getTime();
            });

            console.log('Flashcards filtrate:', this.flashcards);
            if (this.flashcards.length > 0) {
                this.showFlashcard(0);
            } else {
                this.isEmpty = true;
                console.log('Nessuna flashcard disponibile.');
            }
        },
        (error) => console.error('Errore nel caricamento delle flashcard', error)
    );
}


  showFlashcard(index: number): void {
    if (index >= 0 && index < this.flashcards.length) {
      this.currentFlashcardIndex = index;
      this.currentFlashcard = this.flashcards[index];
      this.isDefinitionVisible = false; // Assicurati che la definizione non sia visibile inizialmente
      console.log('Mostra flashcard:', this.currentFlashcard); // Log per debug
    } else {
      console.log('Indice flashcard non valido:', index);
    }
  }

  handleDifficulty(level: number): void {
    if (this.currentFlashcard) {
      this.currentFlashcard.difficultyLevel = level;

      this.flashcardService.updateFlashcard(this.currentFlashcard).subscribe(
        () => {
          this.currentFlashcardIndex++;
          if (this.currentFlashcardIndex < this.flashcards.length) {
            this.showFlashcard(this.currentFlashcardIndex);
          } else {
            this.isEmpty = true; // Imposta isEmpty a true se tutte le flashcard sono state completate
            console.log('Hai finito tutte le flashcard!');
          }
        },
        (error) => console.error('Errore nell\'aggiornamento della flashcard', error)
      );
    }
  }

  toggleDefinition(): void {
    this.isDefinitionVisible = !this.isDefinitionVisible;
  }




}

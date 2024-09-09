// create-flashcard.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashcardService } from '../../service/flashcard.service';
import { IFlashcard } from '../../Interfaces/i-flashcard';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-flashcard',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateFlashcardComponent implements OnInit {
  flashcardForm: FormGroup;
  deckId: number;

  constructor(
    private fb: FormBuilder,
    private flashcardService: FlashcardService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.deckId = +this.route.snapshot.paramMap.get('deckId')!;
    this.flashcardForm = this.fb.group({
      term: ['', Validators.required],
      definition: ['', Validators.required],
      difficultyLevel: [2, Validators.required],
      deckId: [this.deckId]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.flashcardForm.valid) {
      this.flashcardService.createFlashcard(this.flashcardForm.value).subscribe(
        () => {
          // Resetta il form dopo la creazione della flashcard
          console.log('Flashcard creata con successo!');
          this.flashcardForm.reset(); // Resetta il form
          this.flashcardForm.markAsPristine(); // Resetta lo stato del form
          this.flashcardForm.markAsUntouched(); // Rimuove lo stato "toccato"
        },
        (error) => console.error('Errore nella creazione della flashcard', error)
      );
    }
  }
}

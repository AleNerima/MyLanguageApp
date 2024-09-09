import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlashcardRoutingModule } from './flashcard-routing.module';
import { FlashcardComponent } from './flashcard.component';
import { CreateFlashcardComponent } from './create/create.component';
import { ListFlashcardComponent } from './list/list.component';
import { DetailFlashcardComponent } from './detail/detail.component';
import { StudyFlashcardComponent } from './study/study.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditComponent } from './edit/edit.component';


@NgModule({
  declarations: [
    FlashcardComponent,
    CreateFlashcardComponent,
    ListFlashcardComponent,
    DetailFlashcardComponent,
    StudyFlashcardComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    FlashcardRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class FlashcardModule { }

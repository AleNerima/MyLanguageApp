import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeckRoutingModule } from './deck-routing.module';
import { DeckComponent } from './deck.component';
import { DeckListComponent } from './deck-list/deck-list.component';
import { CreateDeckComponent } from './create-deck/create-deck.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditDeckComponent } from './edit-deck/edit-deck.component';
import { DeckDetailComponent } from './deck-detail/deck-detail.component';
import { FlashcardModule } from '../flashcard/flashcard.module';


@NgModule({
  declarations: [
    DeckComponent,
    DeckListComponent,
    CreateDeckComponent,
    EditDeckComponent,
    DeckDetailComponent
  ],
  imports: [
    CommonModule,
    DeckRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class DeckModule { }

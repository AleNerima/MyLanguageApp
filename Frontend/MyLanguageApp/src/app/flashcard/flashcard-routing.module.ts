import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListFlashcardComponent } from './list/list.component';
import { DetailFlashcardComponent } from './detail/detail.component';
import { StudyFlashcardComponent } from './study/study.component';
import { CreateFlashcardComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  { path: 'flashcard/create/:deckId', component: CreateFlashcardComponent },
  { path: 'flashcard/list/:deckId', component: ListFlashcardComponent },
  { path: 'flashcard/detail/:id', component: DetailFlashcardComponent },
  { path: 'flashcard/study/:deckId', component: StudyFlashcardComponent },
  { path: 'flashcard/edit/:id', component: EditComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlashcardRoutingModule { }

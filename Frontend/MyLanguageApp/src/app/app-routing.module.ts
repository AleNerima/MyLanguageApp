import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'Deck', loadChildren: () => import('./deck/deck.module').then(m => m.DeckModule) },
  { path: 'Flashcard', loadChildren: () => import('./flashcard/flashcard.module').then(m => m.FlashcardModule) },
  { path: 'PostComment', loadChildren: () => import('./post-comment/post-comment.module').then(m => m.PostCommentModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

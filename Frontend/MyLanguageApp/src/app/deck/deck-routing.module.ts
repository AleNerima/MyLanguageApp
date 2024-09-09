import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeckListComponent } from './deck-list/deck-list.component';
import { CreateDeckComponent } from './create-deck/create-deck.component';
import { EditDeckComponent } from './edit-deck/edit-deck.component';
import { DeckDetailComponent } from './deck-detail/deck-detail.component';


const routes: Routes = [
  { path: '', component: DeckListComponent },
  { path: 'create', component: CreateDeckComponent },
  { path: 'edit/:id', component: EditDeckComponent },
  { path: 'detail/:id', component: DeckDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeckRoutingModule { }

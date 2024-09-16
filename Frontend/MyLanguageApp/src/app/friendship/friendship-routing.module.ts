import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FriendshipListComponent } from './friendship-list/friendship-list.component';

const routes: Routes = [
  { path: 'friendships', component: FriendshipListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FriendshipRoutingModule { }

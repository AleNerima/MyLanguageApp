import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FriendshipRoutingModule } from './friendship-routing.module';
import { FriendshipComponent } from './friendship.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FriendshipListComponent } from './friendship-list/friendship-list.component';


@NgModule({
  declarations: [
    FriendshipComponent,
    FriendshipListComponent


  ],
  imports: [
    CommonModule,
    FriendshipRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class FriendshipModule { }

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';
import { ChatListComponent } from './chat-list/chat-list.component';
import { ChatConversationComponent } from './chat-conversation/chat-conversation.component';


@NgModule({
  declarations: [
    ChatComponent,
    ChatListComponent,
    ChatConversationComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ChatListComponent,
    ChatConversationComponent
  ]
})
export class ChatModule { }

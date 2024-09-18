import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatListComponent } from './chat-list/chat-list.component';
import { ChatConversationComponent } from './chat-conversation/chat-conversation.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  { path: 'chat-list', component: ChatListComponent,canActivate:[AuthGuard] },          // Percorso per la lista delle chat
  { path: 'chat-conversation/:chatId', component: ChatConversationComponent,canActivate: [AuthGuard] }, // Percorso per la conversazione specifica
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }

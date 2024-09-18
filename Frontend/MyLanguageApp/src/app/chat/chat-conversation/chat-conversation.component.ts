import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../../service/chat.service';
import { AuthService } from '../../auth/auth.service';
import { IChatMessage } from '../../Interfaces/ichat-message';

@Component({
  selector: 'app-chat-conversation',
  templateUrl: './chat-conversation.component.html',
  styleUrls: ['./chat-conversation.component.scss']
})
export class ChatConversationComponent implements OnInit {
  chatId: number | null = null;
  messages: IChatMessage[] = [];
  newMessageText: string = '';
  isLoading: boolean = true;
  errorMessage: string | null = null;
  userId: number = 0; // Utente loggato
  otherUserId: number | null = null; // ID dell'altro utente

  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Recupera l'utente loggato
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.userId = currentUser.userId;
    }

    // Recupera l'ID della chat o dell'amico dai parametri di route
    this.route.params.subscribe(params => {
      this.chatId = +params['chatId']; // Prende l'ID della chat dalla route
      this.otherUserId = +params['otherUserId']; // Prende l'ID dell'altro utente dalla route (se disponibile)

      // Se c'è un chatId valido, carica i messaggi, altrimenti crea una nuova chat
      if (this.chatId && this.chatId > 0) {
        console.log(`Chat ID ricevuto: ${this.chatId}`);
        this.loadMessages();
      } else if (this.otherUserId && this.userId !== this.otherUserId) {
        console.log(`Creazione di una nuova chat tra ${this.userId} e ${this.otherUserId}`);
        this.createNewChat();
      } else {
        this.errorMessage = 'ID chat o destinatario non valido.';
        this.isLoading = false;
      }
    });
  }

  // Carica i messaggi della chat esistente
  loadMessages(): void {
    if (this.chatId) {
      this.chatService.getMessages(this.chatId).subscribe(
        (response: any) => {
          if (response && response.$values && Array.isArray(response.$values)) {
            this.messages = response.$values;

            // Se ci sono messaggi, determina l'ID dell'altro utente
            if (this.messages.length > 0) {
              const firstMessage = this.messages[0];
              this.otherUserId = (firstMessage.senderId === this.userId) ? firstMessage.receiverId : firstMessage.senderId;
              console.log(`Altro utente identificato: ${this.otherUserId}`);
            } else {
              // Se non ci sono messaggi, recupera l'ID dell'altro utente dalla chat
              this.retrieveChatDetails();
            }

            console.log('Messaggi caricati:', this.messages);
          } else {
            this.messages = [];
            this.retrieveChatDetails(); // Recupera i dettagli della chat anche se non ci sono messaggi
          }
          this.isLoading = false;
        },
        (error) => {
          console.error('Errore durante il recupero dei messaggi:', error);
          this.errorMessage = 'Si è verificato un errore durante il recupero dei messaggi.';
          this.isLoading = false;
        }
      );
    }
  }

  // Recupera i dettagli della chat per impostare l'ID dell'altro utente
  retrieveChatDetails(): void {
    if (this.chatId) {
      this.chatService.getChatDetails(this.chatId).subscribe(
        (chatDetails: any) => {
          if (chatDetails) {
            // Imposta otherUserId basandosi sugli utenti della chat
            if (chatDetails.userId1 !== this.userId) {
              this.otherUserId = chatDetails.userId1;
            } else {
              this.otherUserId = chatDetails.userId2;
            }
            console.log(`Altro utente identificato tramite chat: ${this.otherUserId}`);
          } else {
            this.errorMessage = 'Errore durante il recupero dei dettagli della chat.';
            console.error('Errore: dettagli della chat non trovati.');
          }
        },
        (error) => {
          console.error('Errore durante il recupero dei dettagli della chat:', error);
          this.errorMessage = 'Si è verificato un errore durante il recupero dei dettagli della chat.';
        }
      );
    }
  }

  // Crea una nuova chat tra l'utente corrente e un altro utente
  createNewChat(): void {
    if (this.otherUserId) {
      this.chatService.createChat(this.userId, this.otherUserId).subscribe(
        (newChatId: number) => {
          if (newChatId > 0) {
            this.chatId = newChatId;
            console.log(`Nuova chat creata con ID: ${this.chatId}`);

            // Dopo la creazione della chat, assicurati che otherUserId sia impostato
            if (!this.otherUserId) {
              this.otherUserId = this.route.snapshot.params['otherUserId'];
            }

            // Carica i messaggi
            this.loadMessages();
          } else {
            this.errorMessage = 'Errore nella creazione della chat.';
            console.error('Errore: ID della chat non valido:', newChatId);
            this.isLoading = false;
          }
        },
        (error) => {
          console.error('Errore durante la creazione della chat:', error);
          this.errorMessage = 'Si è verificato un errore durante la creazione della chat.';
          this.isLoading = false;
        }
      );
    } else {
      this.errorMessage = 'ID dell\'altro utente non trovato.';
      console.error('Errore: ID dell\'altro utente non trovato.');
      this.isLoading = false;
    }
  }

  // Funzione per inviare un messaggio
  sendMessage(): void {
    if (this.chatId && this.newMessageText.trim()) {
      const receiverId = this.otherUserId;
      if (!receiverId || isNaN(receiverId)) {
        console.error('Errore: destinatario non trovato o ID non valido.');
        return;
      }

      console.log('Invio messaggio:', {
        chatId: this.chatId,
        senderId: this.userId,
        receiverId: receiverId,
        messageText: this.newMessageText
      });

      this.chatService.sendMessage(this.chatId, this.userId, receiverId, this.newMessageText).subscribe(
        () => {
          this.newMessageText = '';  // Resetta il campo del messaggio
          this.loadMessages();       // Ricarica i messaggi
        },
        (error) => {
          console.error('Errore durante l\'invio del messaggio:', error);
          this.errorMessage = 'Si è verificato un errore durante l\'invio del messaggio.';
        }
      );
    } else {
      console.error('Errore: ID chat o testo del messaggio non valido.');
    }
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IChatMessage } from '../Interfaces/ichat-message';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = 'https://localhost:7136/api/Chat';

  constructor(private http: HttpClient) {}

  getChatId(userId1: number, userId2: number): Observable<number> {
    const params = new HttpParams()
      .set('userId1', userId1.toString())
      .set('userId2', userId2.toString());

    return this.http.get<number>(`${this.apiUrl}/chat-id`, { params });
  }

  getMessages(chatId: number): Observable<IChatMessage[]> {
    return this.http.get<IChatMessage[]>(`${this.apiUrl}/messages/${chatId}`);
  }

  sendMessage(chatId: number, senderId: number, receiverId: number, messageText: string): Observable<void> {
    const url = `${this.apiUrl}/send?chatId=${chatId}&senderId=${senderId}&receiverId=${receiverId}`;
    return this.http.post<void>(url, JSON.stringify(messageText), {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  createChat(userId: number, friendId: number): Observable<number> {
    const chatData = { userId, friendId };
    return this.http.post<number>(`${this.apiUrl}/createChat`, chatData, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  getChatDetails(chatId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/details/${chatId}`);
  }


}

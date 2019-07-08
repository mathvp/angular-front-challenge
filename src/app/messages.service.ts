import { Injectable } from '@angular/core';
import { Message } from './message';
import { MESSAGES } from './mock-message';
import { Observable, of, from } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  messages = MESSAGES;

  constructor() { }

  getMessages(): Observable<Message[]> {
    return of(this.messages);
  }

  getMessage(id: number): Observable<Message> {
    return from(this.messages).pipe(filter(msg => msg.id === id));
  }

  saveMessage(message: Message) {
    this.messages.push(message);
  }

  deleteMessage(id: number) {
    this.messages = this.messages.filter(msg => msg.id !== id);
  }
}

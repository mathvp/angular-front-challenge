import { Injectable } from '@angular/core';
import { Message } from './message';
import { MESSAGES } from './mock-message';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor() { }

  getMessage(): Observable<Message[]> {
    return of(MESSAGES);
  }

  saveMessage(message) {
    MESSAGES.push(message);
  }
}

import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Message } from '../message';
import { MessagesService } from '../messages.service';
import { MatDrawer } from '@angular/material';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  messages: Message[];
  currentMessage: number;

  constructor(private breakpointObserver: BreakpointObserver, private messagesService: MessagesService) {
    this.currentMessage = 1;
  }

  ngOnInit() {
    this.getMessages();
  }

  getMessages() {
    this.messagesService.getMessages()
        .subscribe(data => this.messages = data);
    this.showMessage(this.messages[0].id)
  }

  showMessage(messageId: number, drawer?: MatDrawer) {
    this.isHandset$.subscribe(result => {
      if(result && drawer){
        drawer.close();
      }
    });
    this.currentMessage = messageId;
  }

}

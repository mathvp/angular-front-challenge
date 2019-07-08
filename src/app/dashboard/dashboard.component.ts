import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Message } from '../message';
import { MessagesService } from '../messages.service';

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

  constructor(private breakpointObserver: BreakpointObserver, private messagesService: MessagesService) {}

  ngOnInit() {
    this.getMessages();
    console.log(this.messages);
  }

  getMessages() {
    this.messagesService.getMessage()
        .subscribe(data => this.messages = data);
  }

}

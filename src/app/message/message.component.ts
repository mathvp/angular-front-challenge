import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Message } from '../message';
import { MessagesService } from '../messages.service';
import { SubjectsService } from '../subjects.service';
import { Subject } from '../subject';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit, OnChanges {

  @Input() currentMessage: number;
  @Output() currentMessageChange = new EventEmitter<number>();
  message: Message;
  subject: Subject;

  constructor(
    private messagesService: MessagesService,
    private subjectsService: SubjectsService,
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['currentMessage']) {
      this.getMessage();
    }
  }

  ngOnInit() {
    this.getMessage();
  }

  getMessage() {
    this.messagesService.getMessage(this.currentMessage).subscribe(data => this.message = data);
    this.getSubject(this.message.subjectId);
  }

  getSubject(subjectId: number) {
    this.subjectsService.getSubject(subjectId).subscribe(data => this.subject = data);
  }

  deleteMessage() {
    this.messagesService.deleteMessage(this.message.id);
    this.currentMessageChange.emit(this.message.id + 1);
  }


}

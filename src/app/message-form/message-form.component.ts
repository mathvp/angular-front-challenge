import { Component, OnInit } from '@angular/core';
import { Subject } from '../subject';
import { SubjectsService } from '../subjects.service';
import { FormGroup, FormControl } from '@angular/forms';
import { MessagesService } from '../messages.service';
import { Message } from '../message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.scss']
})
export class MessageFormComponent implements OnInit{

  subjects: Subject[];

  message = new Message;

  messageForm = new FormGroup({
    name: new FormControl,
    email: new FormControl,
    phone: new FormControl,
    subject: new FormControl,
    message: new FormControl,
  });

  constructor(
    private subjectsService: SubjectsService,
    private messagesService: MessagesService,
    private router: Router
  ) { }

  ngOnInit(){
    this.getSubject();
  }

  getSubject() {
    this.subjectsService.getSubjects()
        .subscribe(data => this.subjects = data);
  }

  onSubmit() {
    this.message = this.messageForm.value;
    this.messagesService.saveMessage(this.message);
    this.router.navigate(['/']);
  }

}

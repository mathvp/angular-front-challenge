import { Component, OnInit } from '@angular/core';
import { Subject } from '../subject';
import { SubjectsService } from '../subjects.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
    title: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    phone: new FormControl('', Validators.pattern("^[0-9]*$")),
    subjectId: new FormControl('', Validators.required),
    message: new FormControl('', Validators.required),
  });

  constructor(
    private subjectsService: SubjectsService,
    private messagesService: MessagesService,
    private router: Router
  ) { }

  ngOnInit(){
    this.getSubjects();
  }

  getSubjects() {
    this.subjectsService.getSubjects()
        .subscribe(data => this.subjects = data);
  }

  buildMessage() {
    this.message.title = this.messageForm.value.title;
    this.message.message = this.messageForm.value.message;
    this.message.createdAt = Date.now().toString();
    this.message.subjectId = this.messageForm.value.subjectId;
  }

  get f() { return this.messageForm.controls; }

  onSubmit() {
    if (this.messageForm.invalid) {
      return;
    }

    this.buildMessage();
    this.messagesService.saveMessage(this.message);
    this.router.navigate(['/']);
  }

}

import { Component, OnInit } from '@angular/core';
import { Subject } from '../subject';
import { SubjectsService } from '../subjects.service';

@Component({
  selector: 'app-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.scss']
})
export class MessageFormComponent implements OnInit{

  subjects: Subject[];

  constructor(private subjectsService: SubjectsService) {}

  ngOnInit(){
    this.getSubject();
  }

  getSubject() {
    this.subjectsService.getSubject()
        .subscribe(data => this.subjects = data);
  }

}

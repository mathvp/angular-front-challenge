import { Injectable } from '@angular/core';
import { Subject } from './subject';
import { SUBJECTS } from './mock-subject';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {

  constructor() { }

  getSubject(): Observable<Subject[]> {
    return of(SUBJECTS);
  }
}

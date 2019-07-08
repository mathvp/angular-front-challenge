import { Injectable } from '@angular/core';
import { Subject } from './subject';
import { SUBJECTS } from './mock-subject';
import { Observable, of, from } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {

  constructor() { }

  getSubjects(): Observable<Subject[]> {
    return of(SUBJECTS);
  }

  getSubject(id: number):Observable<Subject> {
    return from(SUBJECTS).pipe(filter(msg => msg.id === id));
  }
}

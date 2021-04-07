import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TutorshipDTO} from '../interfaces/tutorship-dto';
import {Observable} from 'rxjs';
import {MessageResponse} from '../interfaces/message-response';
import {environment} from '../../environments/environment';
import {CourseClass} from '../interfaces/course-class';

@Injectable({
  providedIn: 'root'
})
export class TutorshipService {

  constructor(private http: HttpClient) { }

  requestStudent(body: TutorshipDTO, userId: number, courseId: number): Observable<MessageResponse<TutorshipDTO>> {
    return this.http.post<MessageResponse<TutorshipDTO>>(environment.apiUrl + '/tutorship/student/' + userId + '/course/' + courseId, body);
  }

  getCourses(): Observable<MessageResponse<CourseClass[]>> {
    return this.http.get<MessageResponse<CourseClass[]>>(environment.apiUrl + '/course');
  }
}

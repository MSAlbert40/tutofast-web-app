import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {TutorshipDTO} from '../interfaces/tutorship-dto';
import {Observable} from 'rxjs';
import {MessageResponse, MessageResponsePage} from '../interfaces/message-response';
import {environment} from '../../environments/environment';
import {CourseClass} from '../interfaces/course-class';
import {TutorshipClass} from '../interfaces/tutorship-class';

@Injectable({
  providedIn: 'root'
})
export class TutorshipService {

  constructor(private http: HttpClient) { }

  requestStudent(body: TutorshipDTO, userId: number, courseId: number): Observable<MessageResponse<TutorshipDTO>> {
    return this.http.post<MessageResponse<TutorshipDTO>>(environment.apiUrl + '/tutorship/student/' + userId + '/course/' + courseId, body);
  }

  viewRequest(page: number, size: number, course: any, date: string): Observable<MessageResponsePage<TutorshipClass[]>> {
    let params = new HttpParams();
    params = params.set('page', String(page));
    params = params.set('size', String(size));
    if (course !== null && date !== '') {
      params = params.append('courseId', String(course.id));
      params = params.append('date', String(date));
    } else if (course !== null) {
      params = params.append('courseId', String(course.id));
    } else if (date !== '') {
      params = params.append('date', String(date));
    } else {
      params = params.delete('');
    }
    console.log(params);
    return this.http.get<MessageResponsePage<TutorshipClass[]>>(environment.apiUrl + '/tutorship/search/paged', {params});
  }

  getCourses(): Observable<MessageResponse<CourseClass[]>> {
    return this.http.get<MessageResponse<CourseClass[]>>(environment.apiUrl + '/course');
  }

  getCoursesPage(page: number, size: number): Observable<MessageResponsePage<CourseClass[]>> {
    let params = new HttpParams();
    params = params.append('page', String(page));
    params = params.append('size', String(size));
    return this.http.get<MessageResponsePage<CourseClass[]>>(environment.apiUrl + '/course/paged', {params});
  }
}

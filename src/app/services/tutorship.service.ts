import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MessageResponse, MessageResponsePage} from '../interfaces/message-response';
import {environment} from '../../environments/environment';
import {CourseClass} from '../interfaces/course-class';
import {TutorshipClass, TutorshipRequest} from '../interfaces/tutorship-class';
import {TutorshipDetailClass, TutorshipDetailRequest} from '../interfaces/tutorshipDetail-class';

@Injectable({
  providedIn: 'root'
})
export class TutorshipService {

  private tutorship: TutorshipClass;

  constructor(private http: HttpClient) { }

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

  viewTutorship(page: number, size: number, student: number): Observable<MessageResponsePage<TutorshipClass[]>> {
    let params = new HttpParams();
    params = params.set('page', String(page));
    params = params.set('size', String(size));
    params = params.set('studentId', String(student));
    return this.http.get<MessageResponsePage<TutorshipClass[]>>(environment.apiUrl + '/tutorship/search/paged', {params});
  }

  requestStudent(body: TutorshipRequest, userId: number, courseId: number): Observable<MessageResponse<TutorshipRequest>> {
    return this.http.post<MessageResponse<TutorshipRequest>>(environment.apiUrl + '/tutorship/student/' + userId + '/course/' + courseId, body);
  }

  selectTeacher(body: TutorshipClass, tutorship: number, teacher: number): Observable<MessageResponse<TutorshipClass>>{
    return this.http.put<MessageResponse<TutorshipClass>>(environment.apiUrl + '/tutorship/' + tutorship + '/teacher/' + teacher, body);
  }

  viewTeacher(page: number, size: number, tutorship: number): Observable<MessageResponsePage<TutorshipDetailClass[]>> {
    let params = new HttpParams();
    params = params.set('page', String(page));
    params = params.set('size', String(size));
    params = params.set('tutorshipId', String(tutorship));
    return this.http.get<MessageResponsePage<TutorshipDetailClass[]>>(environment.apiUrl + '/tutorshipDetail/search/paged', {params});
  }

  applyRequest(body: TutorshipDetailRequest, teacher: number, tutorship: number): Observable<MessageResponse<TutorshipDetailClass>> {
    return this.http.post<MessageResponse<TutorshipDetailClass>>(environment.apiUrl + '/tutorshipDetail/teacher/' + teacher + '/tutorship/' + tutorship, body);
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

  // tslint:disable-next-line:typedef
  setTutorship(tutorship: TutorshipClass) { this.tutorship = tutorship; }

  // tslint:disable-next-line:typedef
  getTutorship() { return this.tutorship; }
}

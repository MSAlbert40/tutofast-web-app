import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SessionsService {

  constructor(private http: HttpClient) { }

  getAllSessions(json: string) {
    return this.http.get<any>(environment.apiSessionUrl + 'sessions/');
  }

  createSession(courses: number, student: number, json: string) {
    return this.http.post<any>(environment.apiSessionUrl + 'sessions/courses/' + courses + '/students/' + student + '/sessions', json);
  }

  applySession(session: number, teacher: number, json: string) {
    return this.http.post<any>(environment.apiSessionUrl + 'sessions/' + session + '/teacher/' + teacher + '/apply', json);
  }
}

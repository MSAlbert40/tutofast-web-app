import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IAuthUser} from '../interfaces/auth/auth-user';
import {Observable} from 'rxjs';
import {MessageResponse} from '../interfaces/message-response';
import {IAuthResponse} from '../interfaces/auth/auth-response';
import {environment} from '../../environments/environment';
import {IAuthUserRegister} from '../interfaces/auth/auth-user-register';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLogged = false;

  constructor(private http: HttpClient) { }

  signIn(body: IAuthUser): Observable<MessageResponse<IAuthResponse>>{
    return this.http.post<MessageResponse<IAuthResponse>>(environment.apiUrl + '/auth/signin', body);
  }

  signUp(body: IAuthUserRegister): Observable<MessageResponse<IAuthResponse>>{
    return this.http.post<MessageResponse<IAuthResponse>>(environment.apiUrl + '/auth/signup', body);
  }

  // tslint:disable-next-line:typedef
  logOut() { localStorage.removeItem('token'); }

  // tslint:disable-next-line:typedef
  setToken(token: string) { localStorage.setItem('token', token); }

  setIsLogged(value: boolean): void { this.isLogged = value; }

  getIsLogged(): boolean { return this.isLogged; }
}

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

  private isLogged = false;
  private user: IAuthResponse;

  constructor(private http: HttpClient) { }

  // Login Service
  signIn(body: IAuthUser): Observable<MessageResponse<IAuthResponse>>{
    return this.http.post<MessageResponse<IAuthResponse>>(environment.apiUrl + '/auth/signin', body);
  }

  // SignUp Service
  signUp(body: IAuthUserRegister): Observable<MessageResponse<IAuthResponse>>{
    return this.http.post<MessageResponse<IAuthResponse>>(environment.apiUrl + '/auth/signup', body);
  }

  setUser(user: IAuthResponse): void { this.user = user; }

  // tslint:disable-next-line:typedef
  getUser() { return this.user; }

  setToken(token: string): void { localStorage.setItem('token', token); }

  // tslint:disable-next-line:typedef
  logOut() { localStorage.removeItem('token'); }

  setIsLogged(value: boolean): void { this.isLogged = value; }

  getIsLogged(): boolean { return this.isLogged; }
}

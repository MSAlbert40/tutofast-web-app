import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    const params = { username: username, password: password };
    return this.http.post<any>(environment.apiUserUrl + 'users/login', params).pipe(
      map((response) => { 
        localStorage.setItem('userAuth', JSON.stringify(response));
        return response;
      }),
      catchError((error) => { return throwError(error) })
    )
  }

  logout() {
    localStorage.clear();
  }
}

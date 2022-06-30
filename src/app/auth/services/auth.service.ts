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
    localStorage.setItem('userAuth', JSON.stringify(params));

    // return this.http.post<any>(environment.apiUrl + 'login/Authentication', params).pipe(
    //   map((response) => {
    //     if(response['message']['status'] != 0) {
    //       localStorage.setItem('userAuth', JSON.stringify(response));
    //     } return response;
    //   }),
    //   catchError((error) => { return throwError(error) })
    // )
  }

  logout() {
    localStorage.clear();
  }
}

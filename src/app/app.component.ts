import { Component } from '@angular/core';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tutofast-web-app';
  access = true;

  constructor(private authService: AuthService) {
    this.authService.setIsLogged(false);
  }

  // tslint:disable-next-line:typedef
  getShowOption() {
    return this.authService.getIsLogged();
  }

  // tslint:disable-next-line:typedef
  hideAuth() {
    if (this.getShowOption() === true) { this.access = false; }
    return this.access;
  }
}

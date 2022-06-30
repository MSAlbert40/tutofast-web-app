import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userAuth: any;
  userName!: string;
  userRole!: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.userAuth = JSON.parse(localStorage.getItem('userAuth')!);
    this.userRole = 'Docente';
    this.userName = 'Albert Mayta'
  }

  logOut() {
    this.authService.logout();
    this.router.navigateByUrl('/auth/login');
  }

}

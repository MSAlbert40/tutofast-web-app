import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {IAuthResponse} from '../../../interfaces/auth/auth-response';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginInvalid = false;
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.maxLength(150)]],
      password: ['', [Validators.required, Validators.maxLength(200)]]
    });
  }

  ngOnInit(): void { }

  async signIn(): Promise<void> {
    this.authService.signIn(this.loginForm.getRawValue()).subscribe({
      error: (err) => {
        console.log(err);
        this.loginInvalid = true;
      },
      next: (res) => {
        this.loginInvalid = false;
        this.setToken(res.data);
        this.authService.setIsLogged(true);
        console.log(res.data);
      },
      complete: () => console.log('Complete')
    });
  }

  setToken(res: IAuthResponse): void {
    this.authService.setToken(res.token);
    this.router.navigateByUrl('/Dashboard');
  }
}

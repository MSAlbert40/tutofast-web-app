import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public loginInvalid = false;
  loginForm: FormGroup;
  roles = [
    {values: 'ROLE_STUDENT', viewValue: 'Student'},
    {values: 'ROLE_TEACHER', viewValue: 'Teacher'}
  ];

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.maxLength(30)]],
      password: ['', [Validators.required, Validators.maxLength(120)]],
      email: ['', [Validators.email, Validators.maxLength(100)]],
      role: new FormControl(this.roles.values()),
      name: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      dni: ['', [Validators.required, Validators.maxLength(10)]],
      phone: ['', [Validators.required, Validators.maxLength(12)]]
    });
  }

  ngOnInit(): void { }

  signUp(): void {
    this.authService.signUp(this.loginForm.getRawValue()).subscribe({
      error: (err) => {
        console.log(err);
        this.loginInvalid = true;
      },
      next: (res) => console.log(res),
      complete: () => {
        console.log('Complete');
        this.router.navigateByUrl('/Login');
      }
    });
  }
}

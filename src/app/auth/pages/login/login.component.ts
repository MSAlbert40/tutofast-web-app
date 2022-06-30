import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private authService: AuthService, private router: Router, 
  private formBuilder: FormBuilder, private route: ActivatedRoute) { 
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if(this.loginForm.invalid) {
      Swal.fire({
        title: 'Campos inválidos',
        text: 'Por favor, revise los campos',
        icon: 'error',
        confirmButtonText: "Aceptar",
        allowOutsideClick: false
      });
      return;
    } else {
      this.authService.login(this.loginForm.get('username')?.value, this.loginForm.get('password')?.value);
      this.router.navigate(['/inicio']);
      console.log(this.loginForm)
    }
  }

}

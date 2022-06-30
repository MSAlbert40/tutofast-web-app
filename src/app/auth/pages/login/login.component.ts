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

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) { 
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  ngOnInit(): void { }

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
      Swal.fire({
        title: '¡Por favor espere!',
        text: 'Cargando',
        icon: 'info',
        allowOutsideClick: false,
      });
      Swal.showLoading();
      setTimeout(() => {
        this.authService.login(this.loginForm.get('username')?.value, this.loginForm.get('password')?.value).subscribe(result => {
          Swal.fire({
            text: 'Bienvenido a TutoFast',
            icon: 'success',
            confirmButtonText: "Aceptar",
            allowOutsideClick: false
          }).then(() => this.router.navigate(['/inicio']));
        });
      }, 1700);
      // this.router.navigate(['/inicio']);
      // console.log(this.loginForm)
    }
  }

}

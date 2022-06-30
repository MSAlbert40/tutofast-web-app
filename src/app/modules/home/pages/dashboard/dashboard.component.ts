import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CoursesService } from '../../services/courses.service';
import { SessionsService } from '../../services/sessions.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  userAuth: any;
  userRole!: boolean;
  coursesItems: any[];
  sessionsLength: number;
  studentForm: FormGroup;
  teacherForm: FormGroup;

  datasource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['id', 'student', 'start_at', 'end_at', 'topic', 'courses', 'status', 'options'];
  
  constructor(private sessionsService: SessionsService, private coursesService: CoursesService, private formBuilder: FormBuilder) { 
    this.teacherForm = this.formBuilder.group({
      start_at: ['', [Validators.required]],
      end_at: ['', [Validators.required]],
      location: ['', [Validators.required]],
      level: ['', [Validators.required]],
      education: ['', [Validators.required]]
    })

    this.studentForm = this.formBuilder.group({
      start_at: ['', [Validators.required]],
      end_at: ['', [Validators.required]],
      topic: ['', [Validators.required]],
      courses: ['', [Validators.required]],
      status: ['OPEN']
    })
  }

  ngOnInit(): void {
    this.userAuth = JSON.parse(localStorage.getItem('userAuth')!);
    this.userRole = this.userAuth.roles[0].name == 'ROLE_TEACHER' ? true : false;
    this.coursesService.getAllCourses().subscribe({ next: (resp) => this.coursesItems = resp })
  }

  onCreate() {
    let student = this.userAuth.id;
    let courses = this.studentForm.get('courses').value;

    this.studentForm.get('start_at').setValue(this.getDate() + 'T' + this.studentForm.get('start_at').value + ':00.439Z');
    this.studentForm.get('end_at').setValue(this.getDate() + 'T' + this.studentForm.get('end_at').value + ':00.439Z');

    this.sessionsService.createSession(courses, student, this.studentForm.getRawValue()).subscribe({
      next: (resp) => {
        Swal.fire({
          title: 'Registro de Sesión Exitoso',
          text: 'Sesión registrada satisfactoriamente',
          icon: 'success',
          confirmButtonText: "Aceptar",
          allowOutsideClick: false
        }).then(() => { this.onSubmit() });
      },
      complete: () => { this.cleanForm() }
    });
  }

  onApply(session: number) {
    let teacher = this.userAuth.id;

    this.sessionsService.applySession(session, teacher, '').subscribe({
      next: (resp) => {
        Swal.fire({
          title: 'Postulación Exitosa',
          text: 'Su postulación a la sesión se registro satisfactoriamente',
          icon: 'success',
          confirmButtonText: "Aceptar",
          allowOutsideClick: false
        }).then(() => { this.onSubmit() });
      }
    })
  }

  onSubmit() {
    let params = JSON.stringify(this.teacherForm.getRawValue())
    this.sessionsService.getAllSessions(params).subscribe({ 
      next: (resp) => {
        let allItems = resp;
        allItems = allItems.filter((item) => { return item.status == 'OPEN' });
        this.sessionsLength = allItems.length;
        this.datasource = new MatTableDataSource<any>(allItems);
        this.datasource.paginator = this.paginator;
      }
    });
  }

  getDate() {
    var newDate = new Date();
    var dd = String(newDate.getDate()).padStart(2, '0');
    var mm = String(newDate.getMonth()).padStart(2, '0');
    var yyyy = newDate.getFullYear();
    return yyyy + '-' + mm + '-' + dd;
  }

  cleanForm() {
    this.studentForm.get('start_at').setValue('');
    this.studentForm.get('end_at').setValue('');
    this.studentForm.get('topic').setValue('');
    this.studentForm.get('courses').setValue('');
  }
}

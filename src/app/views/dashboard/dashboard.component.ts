import { Component, OnInit } from '@angular/core';
import {IAuthResponse} from '../../interfaces/auth/auth-response';
import {AuthService} from '../../services/auth.service';
import {TutorshipService} from '../../services/tutorship.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CourseClass} from '../../interfaces/course-class';
import * as moment from 'moment';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  private user: IAuthResponse;

  public courses: CourseClass[] = [];
  public jsonControl = new FormControl();
  public filteredCourses: Observable<any>;

  public hourValue = 0;
  public Role: string;

  requestForm: FormGroup;
  isEditMode: any;
  hours = [
    {values: 2, viewValue: '2'},
    {values: 3, viewValue: '3'},
    {values: 4, viewValue: '4'}
  ];

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private tutorshipService: TutorshipService) {
    this.requestForm = this.formBuilder.group({
      topic: ['', [Validators.required, Validators.maxLength(150)]],
      start_at: ['', [Validators.required]],
      start_time: ['', [Validators.required]],
      end_at: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.tutorshipService.getCourses().subscribe({
      error: (err) => console.log(err),
      next: (rest) => {
        this.courses = rest.data;
        console.log(this.courses);
      },
      complete: () => console.log('Complete')
    });
    this.filteredCourses = this.jsonControl.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this.dataFilter(name) : this.courses.slice()),
    );
    this.user = this.authService.getUser();
    console.log(this.user.role);
    this.viewRole(this.user.role);
  }

  public newRequest(): void {
    const newDate: moment.Moment = moment.utc(this.requestForm.value.start_at).local();
    this.requestForm.value.start_at = newDate.format('YYYY-MM-DD') + 'T' + this.requestForm.value.start_time;
    this.requestForm.value.end_at = moment(this.requestForm.value.start_at).add(this.hourValue, 'hours').format('YYYY-MM-DDTHH:mm');
    this.tutorshipService.requestStudent(this.requestForm.value, this.user.id, this.jsonControl.value.id).subscribe({
      error: (err) => console.log(err),
      next: rest => console.log(rest),
      complete: () => console.log('Complete')
    });
  }

  private viewRole(user: string): void {
    if (user === 'ROLE_STUDENT'){
      this.Role = 'Student';
    } else {
      this.Role = 'Teacher';
    }
  }

  private dataFilter(value: string): string[] {
    const newCourses = [];
    this.courses.forEach(element => {
      if (element.name.toLowerCase().indexOf(value.toLowerCase()) !== -1) {
        newCourses.push(element);
      }
    });
    return newCourses;
  }

  public displayFn(course: CourseClass): string {
    return course && course.name ? course.name : '';
  }
}

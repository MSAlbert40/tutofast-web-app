import {Component, OnInit, ViewChild} from '@angular/core';
import {IAuthResponse} from '../../interfaces/auth/auth-response';
import {AuthService} from '../../services/auth.service';
import {TutorshipService} from '../../services/tutorship.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CourseClass} from '../../interfaces/course-class';
import * as moment from 'moment';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MessageResponsePage, Pageable} from '../../interfaces/message-response';
import {TutorshipClass} from '../../interfaces/tutorship-class';
import {MatSort} from '@angular/material/sort';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  private user: IAuthResponse;

  public courses: CourseClass[] = [];
  public filteredCourses: Observable<any>;
  public jsonControl = new FormControl();

  public hourValue = 0;
  public Role: string;

  public dataTutorship: MessageResponsePage<TutorshipClass[]>;
  public newTutorshipPage = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  requestForm: FormGroup;
  isViewRole: boolean;
  isViewTable: boolean;
  displayedColumns: string[] = ['student', 'course', 'topic', 'startAt', 'status', 'apply'];
  hours = [
    {values: 2, viewValue: '2'},
    {values: 3, viewValue: '3'},
    {values: 4, viewValue: '4'}
  ];

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService, private tutorshipService: TutorshipService) {
    this.requestForm = this.formBuilder.group({
      topic: ['', [Validators.required, Validators.maxLength(150)]],
      startAt: ['', [Validators.required]],
      timeAt: ['', [Validators.required]],
      endAt: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.viewCourse();
    this.viewRequest();
    this.viewRole(this.user.role);
    console.log(this.user.role);
  }

  public onSubmit(): void {
    if (this.isViewRole === true) {
      this.newRequest();
      this.isViewTable = true;
    } else{
      this.searchRequest();
      this.isViewTable = true;
    }
  }

  private newRequest(): void {
    const newDate: moment.Moment = moment.utc(this.requestForm.value.startAt).local();
    this.requestForm.value.startAt = newDate.format('YYYY-MM-DD') + 'T' + this.requestForm.value.timeAt;
    this.requestForm.value.endAt = moment(this.requestForm.value.startAt).add(this.hourValue, 'hours').format('YYYY-MM-DDTHH:mm');
    this.tutorshipService.requestStudent(this.requestForm.value, this.user.id, this.jsonControl.value.id).subscribe({
      error: (err) => console.log(err),
      next: rest => console.log(rest),
      complete: () => console.log('Complete')
    });
  }

  private viewRequest(): void {
    this.tutorshipService.viewTutorship(0, 20, this.user.id).subscribe({
      error: (err) => console.log(err),
      next: (rest) => {
        this.dataTutorship = rest;
        this.newTutorshipPage = new MatTableDataSource<TutorshipClass>(this.dataTutorship.data.content);
        this.newTutorshipPage.paginator = this.paginator;
        this.newTutorshipPage.sort = this.sort;
      },
      complete: () => console.log('Complete')
    });
  }

  private searchRequest(): void {
    const newDate: moment.Moment = moment.utc(this.requestForm.value.startAt).local();
    if (this.requestForm.value.startAt !== '') { this.requestForm.value.startAt = newDate.format('YYYY-MM-DD'); }
    this.tutorshipService.viewRequest(0, 20, this.jsonControl.value, this.requestForm.value.startAt).subscribe({
      error: (err) => console.log(err),
      next: (rest) => {
        this.dataTutorship = rest;
        this.newTutorshipPage = new MatTableDataSource<TutorshipClass>(this.dataTutorship.data.content);
        this.newTutorshipPage.paginator = this.paginator;
        this.newTutorshipPage.sort = this.sort;
      },
      complete: () => console.log('Complete')
    });
  }

  public viewCourse(): void {
    // Service List Course
    this.tutorshipService.getCourses().subscribe({
      error: (err) => console.log(err),
      next: (rest) => this.courses = rest.data,
      complete: () => console.log('Complete')
    });
    this.filteredCourses = this.jsonControl.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this.dataFilter(name) : this.courses.slice()),
    );
  }

  private viewRole(user: string): void {
    if (user === 'ROLE_STUDENT'){
      this.Role = 'Student';
      this.isViewRole = true;
      this.isViewTable = false;
    } else {
      this.Role = 'Teacher';
      this.isViewRole = false;
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

  public tutorshipDetail(newTutorshipPage: TutorshipClass): void {
    this.tutorshipService.setTutorship(newTutorshipPage);
    this.router.navigateByUrl('/Tutorship');
  }

  public viewTeacher(newTutorshipPage: TutorshipClass): void {
    this.tutorshipService.setTutorship(newTutorshipPage);
    this.router.navigateByUrl('/Tutorship-Select');
  }
}

import {Component, OnInit, ViewChild} from '@angular/core';
import {TutorshipService} from '../../../services/tutorship.service';
import {TutorshipClass} from '../../../interfaces/tutorship-class';
import {MatTableDataSource} from '@angular/material/table';
import {MessageResponsePage} from '../../../interfaces/message-response';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {TutorshipDetailClass} from '../../../interfaces/tutorshipDetail-class';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tutorship-select',
  templateUrl: './tutorship-select.component.html',
  styleUrls: ['./tutorship-select.component.css']
})
export class TutorshipSelectComponent implements OnInit {

  public tutorship: TutorshipClass;
  public select: number;

  public dataTutorshipDetail: MessageResponsePage<TutorshipDetailClass[]>;
  public newTutorshipDetailPage = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['topic', 'course', 'teacher', 'select'];

  constructor(private router: Router, private tutorshipService: TutorshipService) { }

  ngOnInit(): void {
    this.tutorship = this.tutorshipService.getTutorship();
    this.viewApply();
    console.log(this.newTutorshipDetailPage);
  }

  public viewApply(): void {
    this.tutorshipService.viewTeacher(0, 20, this.tutorship.id).subscribe({
      error: (err) => console.log(err),
      next: (rest) => {
        this.dataTutorshipDetail = rest;
        this.newTutorshipDetailPage = new MatTableDataSource<TutorshipDetailClass>(this.dataTutorshipDetail.data.content);
        this.newTutorshipDetailPage.paginator = this.paginator;
        this.newTutorshipDetailPage.sort = this.sort;
      },
      complete: () => console.log('Complete')
    });
  }

  public Back(): void {
    this.router.navigate(['/Dashboard']);
  }

  public SaveTutorship(): void {
    this.tutorshipService.selectTeacher(this.tutorship, this.tutorship.id, this.select).subscribe({
      error: (err) => console.log(err),
      next: res => console.log(res),
      complete: () => console.log('Completed')
    });
    this.Back();
  }
}

import { Component, OnInit } from '@angular/core';
import {TutorshipClass} from '../../../interfaces/tutorship-class';
import {TutorshipService} from '../../../services/tutorship.service';
import {Router} from '@angular/router';
import {TutorshipDetailRequest} from '../../../interfaces/tutorshipDetail-class';
import {UserClass} from '../../../interfaces/user-class';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-tutorship-detail',
  templateUrl: './tutorship-detail.component.html',
  styleUrls: ['./tutorship-detail.component.css']
})
export class TutorshipDetailComponent implements OnInit {

  public tutorship: TutorshipClass;
  public user: UserClass;
  public tutorshipDetail: TutorshipDetailRequest = {};

  constructor(private router: Router, private authService: AuthService, private tutorshipService: TutorshipService) { }

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.tutorship = this.tutorshipService.getTutorship();
    console.log(this.tutorship);
  }

  public Back(): void {
    this.router.navigate(['/Dashboard']);
  }

  public ApplyTutorship(): void {
    this.tutorshipService.applyRequest(this.tutorshipDetail, this.user.id, this.tutorship.id).subscribe({
      error: (err) => console.log(err),
      next: res => console.log(res),
      complete: () => console.log('Congratulation your Apply')
    });
    this.Back();
  }
}

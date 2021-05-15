import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {LoginComponent} from './views/security/login/login.component';
import {SignupComponent} from './views/security/signup/signup.component';
import {DashboardComponent} from './views/dashboard/dashboard.component';
import {TutorshipDetailComponent} from './views/tutorship/tutorship-detail/tutorship-detail.component';
import {TutorshipSelectComponent} from './views/tutorship/tutorship-select/tutorship-select.component';

const routes: Routes = [
  {path: 'Login', component: LoginComponent},
  {path: 'SignUp', component: SignupComponent},
  {path: 'Dashboard', component: DashboardComponent},
  {path: 'Tutorship', component: TutorshipDetailComponent},
  {path: 'Tutorship-Select', component: TutorshipSelectComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

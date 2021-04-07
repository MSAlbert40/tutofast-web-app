import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {LoginComponent} from './views/security/login/login.component';
import {SignupComponent} from './views/security/signup/signup.component';
import {DashboardComponent} from './views/dashboard/dashboard.component';
import {TestautocompleteComponent} from "./views/testautocomplete/testautocomplete.component";

const routes: Routes = [
  {path: 'Login', component: LoginComponent},
  {path: 'SignUp', component: SignupComponent},
  {path: 'Dashboard', component: DashboardComponent},
  {path:'Test',component:TestautocompleteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

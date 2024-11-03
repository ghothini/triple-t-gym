import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LandingComponent } from './components/landing/landing.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { MembersComponent } from './components/members/members.component';
import { AuthComponent } from './components/authentication/auth/auth.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { DataCenterComponent } from './components/data-center/data-center.component';
import { ReportsComponent } from './components/data-center/reports/reports.component';
import { ImportsComponent } from './components/data-center/imports/imports.component';
import { MemberProfileComponent } from './components/member-profile/member-profile.component';

const routes: Routes = [{ path: '', redirectTo: '/login', pathMatch: 'full' },
{ path: 'login', component: LoginComponent },
{ path: 'auth/email', component: AuthComponent },
{ path: 'register', component: RegisterComponent },
{
  path: 'landing', component: LandingComponent, children: [
    { path: 'home', component: DashboardComponent },
    { path: 'members', component: MembersComponent },
    { path: 'transactions', component: PaymentsComponent },
    { path: 'profile/:email', component: MemberProfileComponent },
    {
      path: 'data-center', component: DataCenterComponent, children: [
        { path: 'reports', component: ReportsComponent },
        { path: 'imports', component: ImportsComponent },
      ]
    }]
},
{ path: '**', component: PageNotFoundComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

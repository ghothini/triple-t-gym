import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LandingComponent } from './components/landing/landing.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { MembersComponent } from './components/members/members.component';

const routes: Routes = [{ path: '', redirectTo: '/login', pathMatch: 'full' },
{ path: 'login', component: LoginComponent },
{
  path: 'landing', component: LandingComponent, children: [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'members', component: MembersComponent },
    { path: 'payments', component: PaymentsComponent }]
},
{ path: '**', component: PageNotFoundComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

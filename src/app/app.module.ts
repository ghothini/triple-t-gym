import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MaterialModule } from './modules/material/material.module';
import { LoginComponent } from './components/login/login.component';
import { MembersComponent } from './components/members/members.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LandingComponent } from './components/landing/landing.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PaymentsComponent } from './components/payments/payments.component';
import { FormComponent } from './components/form/form.component';
import { PieComponent } from './components/charts/pie/pie.component';
import { NgChartsModule } from 'ng2-charts';
import { BarComponent } from './components/charts/bar/bar.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PaymentComponent } from './components/payment/payment.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { AuthComponent } from './components/authentication/auth/auth.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { DataCenterComponent } from './components/data-center/data-center.component';
import { ReportsComponent } from './components/data-center/reports/reports.component';
import { ImportsComponent } from './components/data-center/imports/imports.component';
import { ReportDownloadComponent } from './components/pop-ups/report-download/report-download.component';
import { WorkbookImportComponent } from './components/pop-ups/workbook-import/workbook-import.component';
import { MemberProfileComponent } from './components/member-profile/member-profile.component';
import { MemberProfileActionsComponent } from './components/member-profile-actions/member-profile-actions.component';
import { ProfileAddComponent } from './components/pop-ups/profile-add/profile-add.component';
import { TimePipe } from './pipes/time.pipe';
import { DateTimeFormatPipe } from './pipes/date-time-format.pipe';
import { DeleteConfirmComponent } from './components/pop-ups/delete-confirm/delete-confirm.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    MembersComponent,
    PageNotFoundComponent,
    LandingComponent,
    PaymentsComponent,
    FormComponent,
    PieComponent,
    BarComponent,
    PaymentComponent,
    ToolbarComponent,
    AuthComponent,
    RegisterComponent,
    DataCenterComponent,
    ReportsComponent,
    ImportsComponent,
    ReportDownloadComponent,
    WorkbookImportComponent,
    MemberProfileComponent,
    MemberProfileActionsComponent,
    ProfileAddComponent,
    TimePipe,
    DateTimeFormatPipe,
    DeleteConfirmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgChartsModule
  ],
  providers: [{ provide: MAT_DIALOG_DATA, useValue: {} }],
  bootstrap: [AppComponent]
})
export class AppModule { }

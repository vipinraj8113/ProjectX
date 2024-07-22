import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DxSelectBoxModule } from 'devextreme-angular';
import { AppComponent } from './app.component';
import { SideNavOuterToolbarModule, SingleCardModule } from './layouts';
import {
  AppFooterModule,
  ResetPasswordFormModule,
  CreateAccountFormModule,
  ChangePasswordFormModule,
  LoginFormModule,
} from './components';

import { AuthService, ScreenService, AppInfoService } from './services';
import { UnauthenticatedContentModule } from './layouts/unauthenticated-content/unauthenticated-content';
import { AppRoutingModule } from './app-routing.module';
import { DenialListModule } from './pages/MASTER PAGES/denial/denial-list.component';
import { AnalyticsDashboardModule } from './pages/analytics-dashboard/analytics-dashboard.component';
import { ThemeService } from './services';
import { DxFormModule } from 'devextreme-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskListModule } from 'src/app/components/library/task-list-grid/task-list-grid.component';
import { ClaimSummaryModule } from './pages/REPORT PAGES/claim-summary/claim-summary.component';
import { ClaimSummaryMonthWiseComponent } from './pages/REPORT PAGES/claim-summary-month-wise/claim-summary-month-wise.component';
import { ClaimSummaryPayerWiseComponent } from './pages/REPORT PAGES/claim-summary-payer-wise/claim-summary-payer-wise.component';
import { DoctorWithHighIncomeComponent } from './pages/REPORT PAGES/doctor-with-high-income/doctor-with-high-income.component';
import { DoctorWithHighDenialsComponent } from './pages/REPORT PAGES/doctor-with-high-denials/doctor-with-high-denials.component';
import { RejectedClaimsComponent } from './pages/REPORT PAGES/rejected-claims/rejected-claims.component';
import { BalanceAmountToBeReceivedComponent } from './pages/REPORT PAGES/balance-amount-to-be-received/balance-amount-to-be-received.component';
import { ResubmissionSummaryComponent } from './pages/REPORT PAGES/resubmission-summary/resubmission-summary.component';

@NgModule({
  declarations: [
    AppComponent,
    ClaimSummaryMonthWiseComponent,
    ClaimSummaryPayerWiseComponent,
    DoctorWithHighIncomeComponent,
    DoctorWithHighDenialsComponent,
    RejectedClaimsComponent,
    BalanceAmountToBeReceivedComponent,
    ResubmissionSummaryComponent,
  ],
  imports: [
    TaskListModule,
    BrowserModule,
    SideNavOuterToolbarModule,
    SingleCardModule,
    AppFooterModule,
    ResetPasswordFormModule,
    CreateAccountFormModule,
    ChangePasswordFormModule,
    LoginFormModule,
    UnauthenticatedContentModule,
    DxSelectBoxModule,
    DenialListModule,
    ClaimSummaryModule,
    AnalyticsDashboardModule,
    DxFormModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [AuthService, ScreenService, AppInfoService, ThemeService],
  bootstrap: [AppComponent],
})
export class AppModule {}

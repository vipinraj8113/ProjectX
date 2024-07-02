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
// import { FacilityTypeComponent } from './pages/MASTER PAGES/facility-type/facility-type.component';
// import { CPTTypeComponent } from './pages/MASTER PAGES/cpt-type/cpt-type.component';
// import { CPTMasterComponent } from './pages/MASTER PAGES/cpt-master/cpt-master.component';
import { SpecialityComponent } from './pages/MASTER PAGES/speciality/speciality.component';
import { DenialTypeComponent } from './pages/MASTER PAGES/denial-type/denial-type.component';
import { DenialCategoryComponent } from './pages/MASTER PAGES/denial-category/denial-category.component';
import { FacilityGroupNewFormComponent } from './pages/POP-UP_PAGES/facility-group-new-form/facility-group-new-form.component';
// import { ClinicianComponent } from './pages/MASTER PAGES/clinician/clinician.component';
// import { InsuranceCompaniesComponent } from './pages/MASTER PAGES/insurance-companies/insurance-companies.component';
import { BankMasterComponent } from './pages/MASTER PAGES/bank-master/bank-master.component';
// import { CptMasterNewFormComponent } from './pages/POP-UP_PAGES/cpt-master-new-form/cpt-master-new-form.component';
// import { InsuranceComponent } from './pages/MASTER PAGES/insurance/insurance.component';
// import { InsuranceNewFormComponent } from './pages/POP-UP_PAGES/insurance-new-form/insurance-new-form.component';
// import { CptTypeNewFormComponent } from './pages/POP-UP_PAGES/cpt-type-new-form/cpt-type-new-form.component';
// import { FacilityTypeNewFormComponent } from './pages/POP-UP_PAGES/facility-type-new-form/facility-type-new-form.component';
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
    // CPTTypeComponent,
    // CPTMasterComponent,
    SpecialityComponent,
    DenialTypeComponent,
    DenialCategoryComponent,
    // ClinicianComponent,
    // InsuranceCompaniesComponent,
    BankMasterComponent,
    // CptMasterNewFormComponent,
    // InsuranceComponent,
    // InsuranceNewFormComponent,
    // CptTypeNewFormComponent,
    // FacilityTypeNewFormComponent,
  
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

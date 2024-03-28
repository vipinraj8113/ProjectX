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
import { DenialListModule } from './pages/Denial-list/denial-list.component';
import { AnalyticsDashboardModule } from './pages/analytics-dashboard/analytics-dashboard.component';
import { ThemeService } from './services';
import { DxFormModule } from 'devextreme-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskListModule } from 'src/app/components/library/task-list-grid/task-list-grid.component';
import { ClaimSummaryComponent } from './pages/claim-summary/claim-summary.component';

@NgModule({
  declarations: [AppComponent, ClaimSummaryComponent],
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
    AnalyticsDashboardModule,
    DxFormModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [AuthService, ScreenService, AppInfoService, ThemeService],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { CommonModule } from '@angular/common';
import { Component, NgModule, Input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { confirm } from 'devextreme/ui/dialog';
import { LoginOauthModule } from 'src/app/components/library/login-oauth/login-oauth.component';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxLoadIndicatorModule } from 'devextreme-angular/ui/load-indicator';
import { DxButtonModule, DxButtonTypes } from 'devextreme-angular/ui/button';
import notify from 'devextreme/ui/notify';
import { AuthService, IResponse, ThemeService } from 'src/app/services';
import { SharedServiceService } from 'src/app/services/shared-service.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  @Input() resetLink = '/auth/reset-password';
  @Input() createAccountLink = '/auth/create-account';

  defaultAuthData: IResponse;

  btnStylingMode: DxButtonTypes.ButtonStyle;

  passwordMode = 'password';

  loading = false;

  formData: any = {};

  constructor(
    private authService: AuthService,
    private router: Router,
    private themeService: ThemeService,
    private sharedService: SharedServiceService
  ) {
    this.themeService.isDark.subscribe((value: boolean) => {
      this.btnStylingMode = value ? 'outlined' : 'contained';
    });
  }

  changePasswordMode() {
    debugger;
    this.passwordMode = this.passwordMode === 'text' ? 'password' : 'text';
  }

  //==================Login Function=====================
  async onSubmit(e: Event) {
    e.preventDefault();
    const forcelogin = false;
    const { username, password } = this.formData;
    this.sharedService.triggerLoadComponent(true);
    this.authService.initializeProject().subscribe((response: any) => {
      if (response) {
        this.sharedService.triggerLoadComponent(false);
        this.authService
          .logIn(username, password, forcelogin)
          .subscribe((response: any) => {
            if (response.flag == 1) {
              this.authService.setUserData(response.data);
              localStorage.setItem('logData', JSON.stringify(response.data));
              localStorage.setItem(
                'Token',
                JSON.stringify(response.data.Token)
              );
              localStorage.setItem(
                'sidemenuItems',
                JSON.stringify(response.menus)
              );
              this.router.navigateByUrl('/analytics-dashboard');
            } else {
              const result = confirm(
                'You are already logged in on another device. Do you want to force the login process?',
                'Force Login'
              );
              result.then((dialogResult: boolean) => {
                if (dialogResult) {
                  const forcelogin = true;
                  this.authService
                    .logIn(username, password, forcelogin)
                    .subscribe((response: any) => {
                      if (response.flag == 1) {
                        localStorage.setItem(
                          'logData',
                          JSON.stringify(response.data)
                        );
                        localStorage.setItem(
                          'Token',
                          JSON.stringify(response.data.Token)
                        );
                        localStorage.setItem(
                          'sidemenuItems',
                          JSON.stringify(response.menus)
                        );
                        this.router.navigateByUrl('/analytics-dashboard');
                      }
                    });
                  // You can add any additional logic here, like resetting the form or showing another attempt
                } else {
                  // User chose to cancel the login process
                  console.log('User chose not to continue');
                  // You can handle the cancellation here, like resetting the form or redirecting the user
                }
              });
            }
          });
      }
    });
  }

  onCreateAccountClick = () => {
    this.router.navigate([this.createAccountLink]);
  };

  async ngOnInit(): Promise<void> {
    console.log();
    // this.defaultAuthData = await this.authService.getUser();
  }
}
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    LoginOauthModule,
    DxFormModule,
    DxLoadIndicatorModule,
    DxButtonModule,
  ],
  declarations: [LoginFormComponent],
  exports: [LoginFormComponent],
})
export class LoginFormModule {}

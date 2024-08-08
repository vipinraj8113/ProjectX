import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { DxCheckBoxModule } from 'devextreme-angular';
import { DxTextBoxModule } from 'devextreme-angular/ui/text-box';
import { DxNumberBoxModule } from 'devextreme-angular';
import {
  DxRadioGroupModule,
  DxTemplateModule,
  DxButtonModule,
} from 'devextreme-angular';
import { DxFormModule } from 'devextreme-angular';
import { SystemServicesService } from '../system-services.service';
@Component({
  selector: 'app-security-policy',
  templateUrl: './security-policy.component.html',
  styleUrls: ['./security-policy.component.scss'],
})
export class SecurityPolicyComponent {
  conditionRequired = ['None', '1', '2', '3', 'All'];

  validationRequired: boolean = false;
  readOnlyValue: boolean = true;

  minPasswordLength: number | null = null;
  conditionRequiredValue: any = '';

  isNumberChecked: boolean = false;
  isUppercaseChecked: boolean = false;
  isLowercaseChecked: boolean = false;
  isSpecialCharactersChecked: boolean = false;

  emailOtp: boolean = false;
  smsOtp: boolean = false;
  whatsAppOtp: boolean = false;

  emailAlert: boolean = false;
  smsAlert: boolean = false;
  whatsAppAlert: boolean = false;

  LoginAttempts: number | null = null;
  resetDuration: number | null = null;
  failedLoginDuration: number | null = null;

  changePasswordOnLogin: boolean = false;
  passwordExpiryDaysCount: number | null = null;
  passwordRepeatCycle: number | null = null;

  unautherizedMessage: any = '';
  disableUserOn: number | null = null;

  checkboxStateMap: {
    [key: string]: {
      numbers: boolean;
      uppercase: boolean;
      lowercase: boolean;
      special: boolean;
    };
  } = {
    None: {
      numbers: false,
      uppercase: false,
      lowercase: false,
      special: false,
    },
    '1': { numbers: true, uppercase: false, lowercase: false, special: false },
    '2': { numbers: true, uppercase: true, lowercase: false, special: false },
    '3': { numbers: true, uppercase: true, lowercase: true, special: false },
    All: { numbers: true, uppercase: true, lowercase: true, special: true },
  };

  constructor(private systemService: SystemServicesService) {}

  onClickButton(event: any) {
    const formData = {
      validationRequired: this.validationRequired,
      minPasswordLength: this.minPasswordLength,
      conditionRequiredValue: this.conditionRequiredValue,
      isNumberChecked: this.isNumberChecked,
      isUppercaseChecked: this.isUppercaseChecked,
      isLowercaseChecked: this.isLowercaseChecked,
      isSpecialCharactersChecked: this.isSpecialCharactersChecked,
      emailOtp: this.emailOtp,
      smsOtp: this.smsOtp,
      whatsAppOtp: this.whatsAppOtp,
      emailAlert: this.emailAlert,
      smsAlert: this.smsAlert,
      whatsAppAlert: this.whatsAppAlert,
      loginAttempts: this.LoginAttempts,
      resetDuration: this.resetDuration,
      failedLoginDuration: this.failedLoginDuration,
      changePasswordOnLogin: this.changePasswordOnLogin,
      passwordExpiryDaysCount: this.passwordExpiryDaysCount,
      passwordRepeatCycle: this.passwordRepeatCycle,
      unautherizedMessage: this.unautherizedMessage,
      disableUserOn: this.disableUserOn,
    };
   
  }
  //===========Change validation enable or not=====================
  onValidationEnableChange(newValue: boolean): void {
    this.validationRequired = newValue;
    this.readOnlyValue = !this.readOnlyValue;
  }

  //============Condition select depends radio button value========
  onConditionRequiredChange(newValue: string): void {
    const checkboxState =
      this.checkboxStateMap[newValue] || this.checkboxStateMap['None'];
    this.isNumberChecked = checkboxState.numbers;
    this.isUppercaseChecked = checkboxState.uppercase;
    this.isLowercaseChecked = checkboxState.lowercase;
    this.isSpecialCharactersChecked = checkboxState.special;
  }
}
@NgModule({
  imports: [
    CommonModule,
    DxCheckBoxModule,
    DxTextBoxModule,
    DxNumberBoxModule,
    DxRadioGroupModule,
    DxTemplateModule,
    DxFormModule,
    DxButtonModule,
  ],
  providers: [],
  exports: [],
  declarations: [SecurityPolicyComponent],
})
export class SecurityPolicyModule {}

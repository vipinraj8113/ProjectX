import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseURL } from '../../services/constant-url.service';

const BASE_URL = BaseURL;
const Token = JSON.parse(localStorage.getItem('Token'));
@Injectable({
  providedIn: 'root',
})
export class SystemServicesService {
  constructor(private http: HttpClient) {}
  //======Facility Drop down data=====================
  Get_GropDown(dropDownField: any) {
    const Url = `${BASE_URL}/dropdown`;
    const reqBody = { name: dropDownField };
    return this.http.post(Url, reqBody);
  }
  //===================================Security Policy===================================
  get_securityPolicy_List() {
    const Url = `${BASE_URL}/securitysettings/list`;
    return this.http.post(Url, {});
  }
  //========================Insert OR Update security policy list==========================
  save_security_Policy_Data(data: any) {
    const Url = `${BASE_URL}/securitysettings/save`;
    const reqBody = {
      PasswordValidationRequired: true,
      MinimumLength: '3',
      Numbers: true,
      UppercaseCharacters: true,
      LowercaseCharacters: true,
      SpecialCharacters: true,
      OTPEmailOnPasswordChange: true,
      OTPSMSOnPasswordChange: true,
      whatsAppOTPOnPasswordChange: true,
      AlertEmailOnPasswordChange: true,
      AlertSMSOnPasswordChange: true,
      whatsAppAlertOnPasswordChange: true,
      AccountLockAttempt: '7',
      AccountLockDuration: '6',
      AccountLockFailedLogin: '2',
      UserMustChangePasswordOnLogin: true,
      PasswordAge: '1',
      PasswordRepeatCycle: '2',
      UnauthorizedBannerMessage: 'ADSAD',
      DisableUserOnInactiveDays: '2',

      MinimumCategoriesRequired: true,
    };
    return this.http.post(Url, reqBody);
  }

  //===============================Post office credentials===============================
  //===========List===========
  get_PostOfficeCredencial_List() {
    const Url = `${BASE_URL}/facilitycredentials/list`;
    const reqBody = {
      list: [],
    };
    return this.http.post(Url, reqBody);
  }
  //=====Add or update data========
  update_PostOfficeCredencial_Data(
    FacilityID: any,
    PostOfficeID: any,
    LoginName: any,
    Password: any
  ) {
    const url = `${BASE_URL}/facilitycredentials/update`;
    const reqBody = {
      FacilityID: FacilityID,
      PostOfficeID: PostOfficeID,
      LoginName: LoginName,
      Password: Password,
    };
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'x-api-key': Token,
    // });
    return this.http.post(url, reqBody);
  }
}

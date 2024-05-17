import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseURL,InitData_URL} from '../services/constant-url.service'

// const BASE_URL = 'http://localhost/projectx/api/';
// const baseURL2 = 'http://localhost/crsdashboard/api/initdata';
const BASE_URL =BaseURL;
const baseURL2 = InitData_URL;

@Injectable()
export class ReportService {
  constructor(private http: HttpClient) {}

  //==========Fetch data of Claim Summary Date Wise=============
  get_Claim_Summary_Date_wise(
    userId:any,
    SearchOn: any,
    Facility: any,
    EncounterType: any,
    DateFrom: any,
    DateTo: any
  ) {
    const url = `${BASE_URL}reports/claimdetails`;
    const reqBodyData = {
      userid: userId,
      SearchOn: SearchOn,
      DateFrom: DateFrom,
      DateTo: DateTo,
      EncounterType: EncounterType,
      Facility: Facility,
    };
    return this.http.post(url, reqBodyData);
  }

  //==================Fetch DropDown Data ==============================
  get_Init_Data() {
    const url = `${baseURL2}/initdata`;
    const reqBody = {};
    return this.http.post(url, reqBody);
  }
  //=========================Fetch System Currency Format==================
  getSystemCurrencyCode(): string {
    return new Intl.NumberFormat(navigator.language, {
      style: 'currency',
      currency: 'USD', // Default currency code
    }).resolvedOptions().currency;
  }
  //=========================Save memorise Report==========================
  save_Memorise_report(
    userId: any,
    reportId: any,
    reportName:any,
    memoriseColumnData: any,
    filterParameters:any
  ): any {
    const url = `${BASE_URL}userreports/insert`;
    const reqBody = {
      USER_ID: userId,
      REPORT_ID: reportId,
      USER_REPORT_NAME:reportName,
      userreport_coloumn: memoriseColumnData,
      userreport_parameter:filterParameters
    };
    return this.http.post(url, reqBody);
  }
}

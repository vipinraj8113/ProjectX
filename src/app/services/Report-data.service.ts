import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const BASE_URL = 'http://103.180.120.134/projectx/api/';
const baseURL2 = 'http://103.180.120.134/crsdashboard/api/initdata';

@Injectable()
export class ReportService {
  constructor(private http: HttpClient) {}

  //==========Fetch data of Claim Summary Date Wise=============
  get_Claim_Summary_Date_wise(
    SearchOn: any,
    Facility: any,
    EncounterType: any,
    DateFrom: any,
    DateTo: any
  ) {
    const url = `${BASE_URL}reports/claimdetails`;
    const reqBodyData = {
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
save_Memorise_report(userId:any,reportId:any,memoriseColumnData:any):any{
  const url=`${BASE_URL}userreports/insert`
  const reqBody={
    "USER_ID":userId,
    "REPORT_ID":reportId,
    "userreport_coloumn":memoriseColumnData
  }
  return this.http.post(url,reqBody)

}






}

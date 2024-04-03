import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const baseURL = 'http://103.180.120.134/projectx/api/';

@Injectable()
export class ReportService {
  constructor(private http: HttpClient) {}

  //==========Fetch data of Claim Summary Date Wise=============
  get_Claim_Summary_Date_wise() {
    const url = `${baseURL}reports/claimdetails`;
    const reqBodyData = {
      SearchOn: 'EncounterStartDate',
      DateFrom: '2018-12-01',
      DateTo: '2018-12-31',
      EncounterType: 'OP',
      Facility: 'MF90001',
    };
    return this.http.post(url, reqBodyData);
  }
}

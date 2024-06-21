import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseURL, InitData_URL } from '../services/constant-url.service';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { exportDataGrid as exportDataGridToXLSX } from 'devextreme/excel_exporter';
import { jsPDF } from 'jspdf';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver-es';
// const BASE_URL = 'http://localhost/projectx/api/';
// const baseURL2 = 'http://localhost/crsdashboard/api/initdata';
const BASE_URL = BaseURL;
const baseURL2 = InitData_URL;

@Injectable()
export class ReportService {
  private months: { name: string; value: number }[] = [
    { name: 'January', value: 0 },
    { name: 'February', value: 1 },
    { name: 'March', value: 2 },
    { name: 'April', value: 3 },
    { name: 'May', value: 4 },
    { name: 'June', value: 5 },
    { name: 'July', value: 6 },
    { name: 'August', value: 7 },
    { name: 'September', value: 8 },
    { name: 'October', value: 9 },
    { name: 'November', value: 10 },
    { name: 'December', value: 11 },
  ];

  constructor(private http: HttpClient) {}

  //============Share months to component ================
  getMonths(): { name: string; value: number }[] {
    return this.months;
  }

  //==========Fetch data of Claim Summary Date Wise=============
  get_Claim_Summary_Date_wise(
    userId: any,
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
  //===============Fetch all search parametrs dropdown values===========
  getSearchParametrsData() {
    const url = `${BASE_URL}/reports/parametervalues`;
    const reqBody = { userid: '1', apitoken: '121221212' };
    return this.http.post(url,reqBody)
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
    reportName: any,
    memoriseColumnData: any,
    filterParameters: any
  ): any {
    const url = `${BASE_URL}userreports/insert`;
    const reqBody = {
      USER_ID: userId,
      REPORT_ID: reportId,
      USER_REPORT_NAME: reportName,
      columns: memoriseColumnData,
      parameters: filterParameters,
    };
    return this.http.post(url, reqBody);
  }

  //==============Export function==================
  exportDataGrid(e: any) {
    if (e.format === 'pdf') {
      const doc = new jsPDF();
      exportDataGridToPdf({
        jsPDFDocument: doc,
        component: e.component,
      }).then(() => {
        doc.save('Denials.pdf');
      });
    } else {
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet('Denials');
      exportDataGridToXLSX({
        component: e.component,
        worksheet,
        autoFilterEnabled: true,
      }).then(() => {
        workbook.xlsx.writeBuffer().then((buffer) => {
          saveAs(
            new Blob([buffer], { type: 'application/octet-stream' }),
            'Denials.xlsx'
          );
        });
      });
      e.cancel = true;
    }
  }
}

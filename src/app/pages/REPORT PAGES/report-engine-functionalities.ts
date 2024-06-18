import { Injectable } from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import { jsPDF } from 'jspdf';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver-es';
import { FormGroup } from '@angular/forms';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { exportDataGrid as exportDataGridToXLSX } from 'devextreme/excel_exporter';
import { HttpClient } from '@angular/common/http';
import { ReportService } from 'src/app/services/Report-data.service';

@Injectable({
  providedIn: 'root',
})
export class ReportDataService {
  private dataSource: any;
  public memorise_Dropdown_Data: any[] = [];
  public memoriseDropDownSelectedValue: string = '';
  public MemoriseReportColumns: any[] = [];
  public columnsData: any[] = [];
  public ColumnNames: string[] = [];
  public columnsConfig: any[] = [];
  public show_Pagination: boolean = false;
  public memoriseEnable: string = 'true';

  constructor(private http: HttpClient,private service: ReportService) {}


  loadData(
    userId: any,
    searchOn: any,
    Facility: any,
    encounterType: any,
    fromData: any,
    toDate: any
  ) {
    this.dataSource = new DataSource<any>({
      load: () =>
        new Promise((resolve, reject) => {
          this.service.get_Claim_Summary_Date_wise(
            userId,
            searchOn,
            Facility,
            encounterType,
            fromData,
            toDate
          ).subscribe({
            next: (data: any) => {
              const personalReportData = data.PersonalReports;
              this.memorise_Dropdown_Data = personalReportData.map(
                (personalReport) => {
                  return {
                    name: personalReport.name,
                  };
                }
              );
              const personalReport = data.PersonalReports.find(
                (report) => report.name === this.memoriseDropDownSelectedValue
              );
              // Extract the columns if the personalReport is found
              this.MemoriseReportColumns = personalReport
                ? personalReport.Columns
                : [];

              this.columnsData =
                this.memoriseEnable === 'true'
                  ? this.MemoriseReportColumns
                  : data.ReportColumns;
              this.ColumnNames = this.columnsData.map(
                (column) => column.Name
              );

              // Assuming columnsData is the array of column objects you provided
              this.columnsConfig = this.columnsData.map((column) => {
                return {
                  dataField: column.Name,
                  caption: column.Title,
                  visible: column.Visibility === 'true' ? true : false,
                  type: column.Type,
                  format:
                    column.Type === 'Decimal'
                      ? {
                          type: 'fixedPoint',
                          precision: 2,
                          // currency: this.systemCurrencyCode,
                        }
                      : undefined,
                };
              });
              const claimDetails = data.ReportData;
              console.log('data loaded', claimDetails);
              console.log('memorise checking', data);
              console.log(
                'memorised columns only ',
                this.MemoriseReportColumns
              );
              // sessionStorage.setItem('DataSource', JSON.stringify(data));
              resolve(claimDetails);
              this.show_Pagination = true;
            },
            error: ({ message }) => reject(message),
          });
        }),
    });
  }


}

import {
  Component,
  ViewChild,
  NgModule,
  AfterViewInit,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  DxButtonModule,
  DxDataGridModule,
  DxDataGridComponent,
  DxDropDownButtonModule,
  DxSelectBoxModule,
  DxTextBoxModule,
  DxFormModule,
  DxLookupComponent,
} from 'devextreme-angular';
import { DxPopupModule } from 'devextreme-angular/ui/popup';
import { DxDateBoxModule } from 'devextreme-angular';
import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { exportDataGrid as exportDataGridToXLSX } from 'devextreme/excel_exporter';
import DataSource from 'devextreme/data/data_source';
import { CommonModule } from '@angular/common';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver-es';
import { jsPDF } from 'jspdf';
import { FormPopupModule } from 'src/app/components';
import notify from 'devextreme/ui/notify';
import { ContactPanelModule } from 'src/app/components/library/contact-panel/contact-panel.component';
import {
  DenialNewFormComponent,
  DenialNewFormModule,
} from 'src/app/components/library/denial-new-form/denial-new-form.component';
import { DxLookupModule } from 'devextreme-angular';
import { Router, ActivatedRoute } from '@angular/router';
import { ReportService } from 'src/app/services/Report-data.service';
import { ToolbarAnalyticsModule } from 'src/app/components/utils/toolbar-analytics/toolbar-analytics.component';
import {
  DxAccordionModule,
  DxCheckBoxModule,
  DxSliderModule,
  DxTagBoxModule,
  DxTemplateModule,
} from 'devextreme-angular';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

//======================Dropdown interface=======================
interface dropdownData {
  ID: number;
  Description: string;
}

@Component({
  templateUrl: './claim-summary.component.html',
  styleUrls: ['./claim-summary.component.scss'],
  providers: [ReportService],
})
export class ClaimSummaryComponent implements AfterViewInit {
  @ViewChild(DxDataGridComponent, { static: true })
  dataGrid: DxDataGridComponent;

  @ViewChild(DenialNewFormComponent, { static: false })
  denialComponent: DenialNewFormComponent;

  @ViewChild('lookup', { static: false }) lookup: DxLookupComponent;

  isPanelOpened = false;

  isFilterOpened = false; //filter row enable-desable variable
  isSummaryOpened = false; //summary row enable-desable variable
  isParamsOpend: boolean = true;
  isSaveMemorisedOpened: boolean = false;

  selectedItemKeys: any[] = [];
  Denial_Type_DropDownData: dropdownData[]; // Variable for storing drop down
  Denial_category_DropDownData: dropdownData[]; // Variable for storing drop down

  GridSource: any; //--variable for using column wise filtering data---

  //========Variables for Pagination ====================
  readonly allowedPageSizes: any = [5, 10, 'all'];
  displayMode: any = 'full';
  showPageSizeSelector = true;
  showInfo = true;
  showNavButtons = true;
  show_Pagination = false;

  columnsData: any;

  //================Variables for Storing selected Parameters========
  SearchOn_Value: any;
  Facility_Value: any;
  EncounterType_Value: any;
  From_Date_Value: any = new Date();
  To_Date_Value: any = new Date();

  //===========Variables For DataSource Of Multiple DropDowns=========
  SearchOn_DataSource: any;
  Facility_DataSource: any;
  EncounterType_DataSource: any;

  dataSource: any; //storing data from api
  columnsConfig: any; // used to store all column name
  minDate: Date; // validation for data fields
  maxDate: Date; // validation for data fields

  systemCurrencyCode: any; // using store system currency format
  ColumnNames: any;

  hint_for_Parametr_div: any = 'Hide Parameters';

  currentTime: any = new Date(); //==Crrent time for passing memorise report

  memoriseEnable: any = 'false';
  logData: any;
  user_Id: any = 2;
  Report_Page: string;
  Parameters: any[] = [];
  myform: FormGroup;
  MemoriseReportName: any;
  memoriseDropDownSelectedValue: any;
  MemoriseReportColumns: any;
  memorise_Dropdown_Data: any;
  //=======================Constructor==================
  constructor(
    private service: ReportService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.minDate = new Date(2000, 1, 1); // Set the minimum date
    this.maxDate = new Date(); // Set the maximum date
    this.fetch_Dropdown_InitData();
    this.logData = JSON.parse(localStorage.getItem('logData'));
    this.user_Id = this.logData.USER_ID;
    this.Report_Page = this.router.url.slice(1);
    const parametrs = JSON.parse(sessionStorage.getItem('reportData'));
    this.Parameters.push(parametrs);
    this.systemCurrencyCode = this.service.getSystemCurrencyCode();
    const loadedPAgeFlag = JSON.parse(sessionStorage.getItem('loadedFlag'));
    if (loadedPAgeFlag == 'true') {
      this.DataSorce_After_reload_Page();
    }
  }

  ngAfterViewInit() {
    if (this.dataGrid) {
      const columns = this.dataGrid.instance.getVisibleColumns();
    }
  }
  //============Hide drop down after Value Selected======
  onSearchOnValueChanged() {
    // Close the dropdown
    const lookupInstance = this.lookup.instance;
    if (lookupInstance) {
      lookupInstance.close();
    }
  }
  //============Fetch DataSource For Reporting Grid======
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
          this.service
            .get_Claim_Summary_Date_wise(
              userId,
              searchOn,
              Facility,
              encounterType,
              fromData,
              toDate
            )
            .subscribe({
              next: (data: any) => {
                const personalReportData = data.PersonalReports;
                this.memorise_Dropdown_Data = personalReportData.map(
                  (personalReport) => {
                    return {
                      name: personalReport.name,
                    };
                  }
                );

                // Find the PersonalReport object with the name "first test"
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
  //============Fetching DropDown Init Data==============
  fetch_Dropdown_InitData() {
    this.service.get_Init_Data().subscribe((response: any) => {
      this.SearchOn_DataSource = response.SearchOn;
      this.Facility_DataSource = response.Facility;
      this.EncounterType_DataSource = response.EncountrType;
    });
  }
  //============Call DataSource Using Selected Values====
  get_Report_DataSource() {
    var userId = this.user_Id;
    var searchOn = this.SearchOn_Value;
    var Facility = this.Facility_Value;
    var EncounterType = this.EncounterType_Value;
    var fromDate = this.formatDate(this.From_Date_Value);
    var toDate = this.formatDate(this.To_Date_Value);

    // Create an object with the variables
    var reportData = {
      SEARCH_ON: searchOn,
      FACILITY_ID: Facility,
      ENCOUNTER_TYPE: EncounterType,
      START_DATE: fromDate,
      END_DATE: toDate,
    };
    // Store the object in session storage
    sessionStorage.setItem('reportData', JSON.stringify(reportData));
    this.loadData(userId, searchOn, Facility, EncounterType, fromDate, toDate);
    sessionStorage.setItem('loadedFlag', JSON.stringify('true'));
    this.show_Parameter_Div();
  }
  //==============DataLoading After Reload Page==========
  DataSorce_After_reload_Page() {
    const report_Parameters = JSON.parse(sessionStorage.getItem('reportData'));
    this.SearchOn_Value = report_Parameters.SEARCH_ON;
    this.Facility_Value = report_Parameters.FACILITY_ID;
    this.EncounterType_Value = report_Parameters.ENCOUNTER_TYPE;
    this.From_Date_Value = report_Parameters.START_DATE;
    this.To_Date_Value = report_Parameters.END_DATE;
    this.loadData(
      this.user_Id,
      this.SearchOn_Value,
      this.Facility_Value,
      this.EncounterType_Value,
      this.From_Date_Value,
      this.To_Date_Value
    );
  }
  //=================change the format of date===========
  formatDate(dateString: any) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}/${month}/${day}`;
  }
  //============Show Parametrs Div=======================
  show_Parameter_Div = () => {
    this.isParamsOpend = !this.isParamsOpend;
    this.hint_for_Parametr_div = this.isParamsOpend
      ? 'Hide Parameters'
      : 'Show Parameters';
  };
  //============Show Filter Row==========================
  filterClick = () => {
    this.isFilterOpened = !this.isFilterOpened;
  };
  //============Show Filter Row==========================
  SummaryClick = () => {
    this.isSummaryOpened = !this.isSummaryOpened;
  };
  //==============Show Memorise Report===================
  ShowMemoriseTable = (e: any) => {
    this.memoriseDropDownSelectedValue = e.value;
    this.memoriseEnable = this.memoriseEnable === 'true' ? 'false' : 'true';
    this.get_Report_DataSource();
  };
  //=============DataGrid Refreshing=====================
  refresh = () => {
    this.dataGrid.instance.refresh();
    // // console.log('grid console:', this.dataGrid.instance);
  };
  //=====================Search on Each Column===========
  applyFilter() {
    this.GridSource.filter();
  }
  //===========Column location finding===================
  makeColumnVisible = (e: any) => {
    const columnName = e.value;
    const columns = this.dataGrid.instance.getVisibleColumns();
    const columnIndex = columns.findIndex(
      (column) => column.dataField === columnName
    );
    // console.log('column index:', columnName, columnIndex);
    if (columnIndex !== -1) {
      const columnWidth = 200; // Adjust 100 to fit your column width
      const scrollLeft = (columnIndex - 1) * columnWidth;
      this.dataGrid.instance.getScrollable().scrollTo({ left: scrollLeft });

      this.dataGrid.instance.columnOption(
        columnName,
        'cssClass',
        'highlighted-column'
      );
      setTimeout(() => {
        this.dataGrid.instance.columnOption(columnName, 'cssClass', null);
      }, 3000); // 1000 milliseconds = 1 second
    }
  };
  //================Exporting Function===================
  onExporting(e) {
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
  //==========show memorise save pop up=================
  show_Memorise_popup = () => {
    this.isSaveMemorisedOpened = !this.isSaveMemorisedOpened;
  };
  //==========fetch custome memorise report name==========
  onMemoriseReportNameChanged(e) {
    this.MemoriseReportName = e.value;
  }
  //================Save Memorize Reports==============
  save_Memorise_Report() {
    const memoriseName = this.MemoriseReportName;
    const filterParameters = this.Parameters;
    const reportColumns = this.columnsData;
    const allColumns = this.ColumnNames;
    const columns = this.dataGrid.instance.getVisibleColumns();
    const VisiblecolumnNames = columns
      .map((col) => col.caption || col.dataField)
      .filter((name) => name !== undefined);
    const hiddenColumns = allColumns.filter(
      (colName) => !VisiblecolumnNames.includes(colName)
    );
    const memoriseReportColumns = reportColumns.map((column) => {
      return {
        ...column,
        Visibility: hiddenColumns.includes(column.Name) ? 'false' : 'true',
      };
    });
    this.service
      .save_Memorise_report(
        this.user_Id,
        this.Report_Page,
        memoriseName,
        memoriseReportColumns,
        this.Parameters
      )
      .subscribe((response) => {
        if (response) {
          notify(
            {
              message: `${response.message}`,
              position: { at: 'top right', my: 'top right' },
            },
            'success'
          );
          console.log(response.message);
        } else {
          notify(
            {
              message: `${response.message}`,
              position: { at: 'top right', my: 'top right' },
            },
            'error'
          );
        }
      });
    console.log(
      this.user_Id,
      this.Report_Page,
      this.Parameters,
      memoriseName,
      memoriseReportColumns
    );
  }
}

@NgModule({
  imports: [
    DxButtonModule,
    DxDataGridModule,
    DxDropDownButtonModule,
    DxSelectBoxModule,
    DxTextBoxModule,
    DxLookupModule,
    ContactPanelModule,
    DenialNewFormModule,
    FormPopupModule,
    CommonModule,
    DxFormModule,
    ToolbarAnalyticsModule,
    DxDateBoxModule,
    DxToolbarModule,
    DxAccordionModule,
    DxCheckBoxModule,
    DxSliderModule,
    DxTagBoxModule,
    DxTemplateModule,
    DxPopupModule,
    ReactiveFormsModule,
  ],
  providers: [],
  exports: [],
  declarations: [ClaimSummaryComponent],
})
export class ClaimSummaryModule {}

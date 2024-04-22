import {
  Component,
  ViewChild,
  NgModule,
  OnInit,
  AfterViewInit,
} from '@angular/core';
import {
  DxButtonModule,
  DxDataGridModule,
  DxDataGridComponent,
  DxDropDownButtonModule,
  DxSelectBoxModule,
  DxTextBoxModule,
  DxFormModule,
} from 'devextreme-angular';
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

  isPanelOpened = false;

  isFilterOpened = false; //filter row enable-desable variable
  isSummaryOpened = false; //summary row enable-desable variable
  isParamsOpend: boolean = true;

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
  selectedColumnName: string;

  //=======================Constructor==================
  constructor(
    private service: ReportService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.minDate = new Date(2000, 1, 1); // Set the minimum date
    this.maxDate = new Date(); // Set the maximum date
    this.fetch_Dropdown_InitData();
    this.systemCurrencyCode = this.service.getSystemCurrencyCode();
    console.log(this.systemCurrencyCode);
  }

  ngAfterViewInit() {
    if (this.dataGrid) {
      const columns = this.dataGrid.instance.getVisibleColumns();
      console.log(columns);
    }
  }

  //============Fetch DataSource For Reporting Grid================
  loadData(
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
              searchOn,
              Facility,
              encounterType,
              fromData,
              toDate
            )
            .subscribe({
              next: (data: any) => {
                this.columnsData = data.Columns;
                this.ColumnNames = this.columnsData.map(
                  (column) => column.Name
                );
                // Assuming columnsData is the array of column objects you provided
                this.columnsConfig = this.columnsData.map((column) => {
                  return {
                    dataField: column.Name,
                    caption: column.Title,
                    format:
                      column.Type === 'Decimal'
                        ? {
                            type: 'fixedPoint',
                            precision: 2,
                            currency: this.systemCurrencyCode,
                          }
                        : undefined,
                  };
                });
                resolve(data.ClaimDetails);
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

      console.log('Init Data Fetched Successfully :', this.SearchOn_DataSource);
    });
  }

  //============Call DataSource Using Selected Values===============

  get_Report_DataSource() {
    var searchOn = this.SearchOn_Value;
    var Facility = this.Facility_Value;
    var EncounterType = this.EncounterType_Value;
    var fromDate = this.formatDate(this.From_Date_Value);
    var toDate = this.formatDate(this.To_Date_Value);
    // console.log("date picked successfully :",fromDate,toDate)
    this.loadData(searchOn, Facility, EncounterType, fromDate, toDate);
    this.show_Parameter_Div();
  }
  //==============change the format of date=============
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
  };

  //============Show Filter Row==========================
  filterClick = () => {
    this.isFilterOpened = !this.isFilterOpened;
  };
  //============Show Filter Row==========================
  SummaryClick = () => {
    this.isSummaryOpened = !this.isSummaryOpened;
  };
  //=============DataGrid Refreshing=======================
  refresh = () => {
    this.dataGrid.instance.refresh();
    console.log('grid console:', this.dataGrid.instance);
  };
  //=====================Search on Each Column=============
  applyFilter() {
    this.GridSource.filter();
  }

  //===========Column location finding===========
  makeColumnVisible = (e: any) => {
    const columnName = e.value;
    const columns = this.dataGrid.instance.getVisibleColumns();
    const columnIndex = columns.findIndex(
      (column) => column.dataField === columnName
    );
    console.log('column index:', columnName, columnIndex);
    if (columnIndex !== -1) {
      const columnWidth = 100; // Adjust 100 to fit your column width
      const scrollLeft = columnIndex * columnWidth;
      this.dataGrid.instance.getScrollable().scrollTo({ left: scrollLeft });

      // Highlight the column
      const headerCells = document.querySelectorAll(
        '.dx-header-row .dx-header-cell'
      );
      headerCells.forEach((cell, index) => {
        if (index === columnIndex) {
          cell.classList.add('highlight-column');
        } else {
          cell.classList.remove('highlight-column');
        }
      });
    }
  };

  //================Exporting Function=====================
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
  ],
  providers: [],
  exports: [],
  declarations: [ClaimSummaryComponent],
})
export class ClaimSummaryModule {}

import { Component, ViewChild, NgModule, OnInit,AfterViewInit } from '@angular/core';
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
  dataGrid : DxDataGridComponent;

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
  summaryData: any;

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

  dataSource: any;
  minDate: Date;
  maxDate: Date;


  //============Get DataSource VAluee======================
  //=====
  // dataSource: any = new DataSource<any>({
  //   load: () =>
  //     new Promise((resolve, reject) => {
  //       this.service.get_Claim_Summary_Date_wise().subscribe({
  //         next: (data: any) => {
  //           this.summaryData = data.Columns;
  //           // console.log("summary data",this.summaryData)
  //           resolve(data.ClaimDetails);
  //         },
  //         error: ({ message }) => reject(message),
  //       });
  //     }),
  // });

  //=======================Constructor==================
  constructor(
    private service: ReportService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.minDate = new Date(2000, 1, 1); // Set the minimum date
    this.maxDate = new Date(); // Set the maximum date
    this.fetch_Dropdown_InitData();
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
                this.summaryData = data.Columns;
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
    this. show_Parameter_Div()
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
  show_Parameter_Div=() =>{
    if (this.isParamsOpend == true) {
      this.isParamsOpend = false;
    } else {
      this.isParamsOpend = true;
    }
  }
  //============Show Filter Row==========================
  filterClick = () => {
    if (this.isFilterOpened == false) {
      this.isFilterOpened = true;
    } else {
      this.isFilterOpened = false;
    }
  };
  //============Show Filter Row==========================
  SummaryClick = () => {
    if (this.isSummaryOpened == false) {
      this.isSummaryOpened = true;
    } else {
      this.isSummaryOpened = false;
    }
  };
  //=============DataGrid Refreshing=======================
  refresh = () => {

    this.dataGrid.instance.refresh();
  };
  //=====================Search on Each Column=============
  applyFilter() {
    this.GridSource.filter();
  }

  //===========Column Locating USing Column Name===========
  onToolbarPreparing(e) {
    const dataGrid = e.component;

    e.toolbarOptions.items.unshift({
      location: 'before',
      widget: 'dxTextBox',
      options: {
        placeholder: 'Search',
        onValueChanged: function (args) {
          const columnIndex = dataGrid.columnOption('columnName').index;
          dataGrid.clearFilter();
          if (args.value) {
            dataGrid.filter(['columnName', 'contains', args.value]);
            dataGrid.focus(dataGrid.getCellElement(0, columnIndex));
            dataGrid.selectRowsByIndexes([], true);
          }
        },
      },
    });
  }

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

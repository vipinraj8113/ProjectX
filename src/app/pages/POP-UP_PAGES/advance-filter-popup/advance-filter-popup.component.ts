import { CommonModule } from '@angular/common';
import { Component, ElementRef, NgModule, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import notify from 'devextreme/ui/notify';
import {
  DxDataGridModule,
  DxButtonModule,
  DxDataGridComponent,
} from 'devextreme-angular';
@Component({
  selector: 'app-advance-filter-popup',
  templateUrl: './advance-filter-popup.component.html',
  styleUrls: ['./advance-filter-popup.component.scss'],
})
export class AdvanceFilterPopupComponent {
  @ViewChild(DxDataGridComponent, { static: true })
  dataGrid: DxDataGridComponent;
  @ViewChild('fileInput') fileInput!: ElementRef;

  gridColumns: any[] = [
    { dataField: 'Facility', caption: 'Facility', allowHiding: false },
    { dataField: 'SearchOn', caption: 'Search On' },
    { dataField: 'Year', caption: 'Year' },
    { dataField: 'Month', caption: 'Month' },
    { dataField: 'ReceiverID', caption: 'Receiver ID', allowHiding: false },
    { dataField: 'PayerID', caption: 'Payer ID' },
    { dataField: 'Payer', caption: 'Payer' },
    {
      dataField: 'AsOnDate',
      caption: 'As On Date',
      dataType: 'date',
    },
    { dataField: 'Clinician', caption: 'Clinician', allowHiding: false },
    {
      dataField: 'OrderingClinician',
      caption: 'Ordering Clinician',
    },
    { dataField: 'EncounterType', caption: 'Encounter Type' },
  ];
  gridDataSource: any[] = [];
  formattedData: any;
  GridTabledata: any;
  ResultData: any;
  constructor() {}

  //==========Function to import Excel data=======
  import_ExcelData(event: any) {
    const target: DataTransfer = <DataTransfer>event.target;
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });

      // Extract the first row as column names from the Excel sheet and convert to lowercase
      const excelColumnNames: string[] = (data[0] as string[]).map(
        (col: string) => col.toLowerCase()
      );

      // Get DataGrid column names, convert to lowercase, and include only visible columns
      const dataGridColumnNames: string[] = this.dataGrid.instance
        .getVisibleColumns()
        .map((col) => col.dataField.toLowerCase());
      // Convert the Excel data to the required format
      if (
        JSON.stringify(excelColumnNames) == JSON.stringify(dataGridColumnNames)
      ) {
        this.gridDataSource = this.formatData(data);
      } else {
        notify(
          {
            message: `Columns are not matched`,
            position: { at: 'top right', my: 'top right' },
          },
          'error'
        );
      }
    };
    reader.readAsBinaryString(target.files[0]);
  }
  //===========format Excel Data============
  formatData(data: any[]): any[] {
    const formattedData: any[] = [];
    data.slice(1).forEach((row: any) => {
      const rowData = {
        Facility: row[0],
        SearchOn: row[1],
        Year: row[2],
        Month: row[3],
        ReceiverID: row[4],
        PayerID: row[5],
        Payer: row[6],
        AsOnDate: row[7] ? this.format_display_Date_(new Date(row[7])) : null,
        Clinician: row[8],
        OrderingClinician: row[9],
        EncounterType: row[10],
      };
      formattedData.push(rowData);
    });
    return formattedData;
  }

  format_display_Date_(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    };
    return date.toLocaleDateString('en-GB', options);
  }

  //========Fetch data from datagrid===========
  fetch_DataGrid_Data = () => {
    const dataSource = this.dataGrid.instance.getDataSource();
    this.GridTabledata = dataSource.items();
    return this.ConvertDataFormat(this.GridTabledata);
  };
  //===========Convert the data to API input format============
  ConvertDataFormat(data: any[]) {
    this.formattedData = data.map((item) => ({
      SearchOn: item.SearchOn || '',
      DateFrom: this.formatDate(item.AsOnDate), // Adjust as needed
      DateTo: this.formatDate(item.AsOnDate), // Adjust as needed
      EncounterType: item.EncounterType || 'All',
      Facility: item.Facility
        ? item.Facility.split(',')
            .map((facility) => facility.trim())
            .join(', ')
        : 'All',
    }));
    return this.formattedData;
  }
  //============Format the date==============
  formatDate(date: Date): string {
    if (!date) return '';
    const formattedDate = new Date(date).toISOString().split('T')[0];
    return formattedDate;
  }

  getResultData = () => ({ ...this.fetch_DataGrid_Data });
  //===============Refresh datagrid============
  refresh = () => {
    this.dataGrid.instance.refresh();
  };
}
@NgModule({
  imports: [CommonModule, DxDataGridModule, DxButtonModule],
  declarations: [AdvanceFilterPopupComponent],
  exports: [AdvanceFilterPopupComponent],
})
export class AdvanceFilterPopupModule {}

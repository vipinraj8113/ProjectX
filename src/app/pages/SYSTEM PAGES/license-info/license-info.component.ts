import { CommonModule } from '@angular/common';
import { Component, NgModule, ViewChild } from '@angular/core';
import {
  DxDataGridModule,
  DxButtonModule,
  DxDropDownButtonModule,
  DxSelectBoxModule,
  DxTextBoxModule,
  DxLookupModule,
  DxDataGridComponent,
} from 'devextreme-angular';
import { ReportService } from 'src/app/services/Report-data.service';

@Component({
  selector: 'app-license-info',
  templateUrl: './license-info.component.html',
  styleUrls: ['./license-info.component.scss'],
  providers: [ReportService],
})
export class LicenseInfoComponent {
  @ViewChild(DxDataGridComponent, { static: true })
  dataGrid: DxDataGridComponent;

  //========Variables for Pagination ====================
  readonly allowedPageSizes: any = [5, 10, 'all'];
  displayMode: any = 'full';
  showPageSizeSelector = true;
  showInfo = true;
  showNavButtons = true;
  columnData: any = ['facility ID', 'Facility Name', 'Region', 'Post Office'];
  DataSource: any; //===DataSorce Variable==
  ProductKey: any;

  
  constructor(private service: ReportService) {}

  //========================Export data ==========================
  onExporting(event: any) {
    this.service.exportDataGrid(event);
  }
  //=================== Page refreshing==========================
  refresh = () => {
    this.dataGrid.instance.refresh();
  };
}
@NgModule({
  imports: [
    CommonModule,
    DxDataGridModule,
    DxButtonModule,
    DxDataGridModule,
    DxDropDownButtonModule,
    DxSelectBoxModule,
    DxTextBoxModule,
    DxLookupModule,
  ],
  providers: [],
  exports: [],
  declarations: [LicenseInfoComponent],
})
export class LicenseInfoModule {}

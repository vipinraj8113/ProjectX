import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import {
  DxButtonModule,
  DxDataGridModule,
  DxDropDownButtonModule,
  DxLookupModule,
  DxSelectBoxModule,
  DxTextBoxModule,
} from 'devextreme-angular';
import { DataService } from 'src/app/services';
import { ReportService } from 'src/app/services/Report-data.service';
@Component({
  selector: 'app-facility-list',
  templateUrl: './facility-list.component.html',
  styleUrls: ['./facility-list.component.scss'],
  providers: [DataService, ReportService],
})
export class FacilityListComponent {
  dataSource: any;
  //========Variables for Pagination ====================
  readonly allowedPageSizes: any = [5, 10, 'all'];
  displayMode: any = 'full';
  showPageSizeSelector = true;
  showInfo = true;
  showNavButtons = true;
  constructor(private service: ReportService) {                                                                                                          }
  //========================Export data ==========================
  onExporting(event: any) {
    this.service.exportDataGrid(event);
  }
  //====================Row Data Deleting=========================
  onRowRemoving(event: any) {}
  //===================RTow Data Update==========================
  onRowUpdating(event: any) {}
  //=================== Page refreshing==========================
  refresh = () => {};
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
  declarations: [FacilityListComponent],
})
export class FacilityListModule {}

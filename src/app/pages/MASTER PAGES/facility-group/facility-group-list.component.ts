import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import {
  DxButtonModule,
  DxDataGridComponent,
  DxDataGridModule,
  DxDropDownButtonModule,
  DxLookupModule,
  DxSelectBoxModule,
  DxTextBoxModule,
} from 'devextreme-angular';
import { DataService } from 'src/app/services';
import { ReportService } from 'src/app/services/Report-data.service';
import { MasterReportService } from '../master-report.service';
@Component({
  selector: 'app-facility-group-list',
  templateUrl: './facility-group-list.component.html',
  styleUrls: ['./facility-group-list.component.scss'],
  providers: [DataService, ReportService],
})
export class FacilityGroupListComponent implements OnInit {
  @ViewChild(DxDataGridComponent, { static: true })
  dataGrid: DxDataGridComponent;

  dataSource: any;
  //========Variables for Pagination ====================
  readonly allowedPageSizes: any = [5, 10, 'all'];
  displayMode: any = 'full';
  showPageSizeSelector = true;
  showInfo = true;
  showNavButtons = true;

  constructor(
    private service: ReportService,
    private masterService: MasterReportService
  ) {}

  ngOnInit(): void {
    this.get_Facility_Group_dataSource();
  }

  //========================Get Datasource =======================
  get_Facility_Group_dataSource() {
    this.masterService.Get_Facility_Group_Data().subscribe((response: any) => {
      this.dataSource = response;
    });
  }
  //========================Export data ==========================
  onExporting(event: any) {
    this.service.exportDataGrid(event);
  }
  //====================Add data ================================
  addFacilityGroup() {}
  //====================Row Data Deleting========================
  onRowRemoving(event: any) {}
  //===================RTow Data Update==========================
  onRowUpdating(event: any) {}
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
  declarations: [FacilityGroupListComponent],
})
export class FacilityGroupListModule {}

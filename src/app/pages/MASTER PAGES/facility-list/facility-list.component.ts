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
  selector: 'app-facility-list',
  templateUrl: './facility-list.component.html',
  styleUrls: ['./facility-list.component.scss'],
  providers: [DataService, ReportService],
})
export class FacilityListComponent implements OnInit {
  @ViewChild(DxDataGridComponent, { static: true })
  dataGrid: DxDataGridComponent;
  dataSource: any;
  FacilityType_DataSource:any
  Facilitygroup_DataSource:any
  postOffice_DataSource:any
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
    this.get_Facility_List();
  }
  get_All_DropDown_Data(){
    this.FacilityType_DataSource = this.masterService.Get_GropDown("FACILITYTYPE")
    this.Facilitygroup_DataSource = this.masterService.Get_GropDown("FACILITYGROUP")
    this.postOffice_DataSource = this.masterService.Get_GropDown("POSTOFFICE")
  }
  //====================Get Facility List Datasource==============
  get_Facility_List() {
    this.masterService.Get_Facility_List_Data().subscribe((response: any) => {
      if (response) {
        this.dataSource = response;
      }
    });
  }
  //========================Export data ==========================
  onExporting(event: any) {
    this.service.exportDataGrid(event);
  }
  //====================Row Data Deleting=========================
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
  declarations: [FacilityListComponent],
})
export class FacilityListModule {}

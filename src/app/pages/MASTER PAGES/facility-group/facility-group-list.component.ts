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
import notify from 'devextreme/ui/notify';
import {FacilityGroupNewFormModule} from '../../POP-UP_PAGES/facility-group-new-form/facility-group-new-form.component'
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
  isAddContactPopupOpened=true
  onClickSaveNewDenial(){

  }
  //========================Get Datasource =======================
  get_Facility_Group_dataSource() {
    this.masterService.Get_Facility_Group_Data().subscribe((response: any) => {
      this.dataSource = response.FacilityGroups;
    });
  }
  //========================Export data ==========================
  onExporting(event: any) {
    this.service.exportDataGrid(event);
  }
  //====================Add data ================================
  addFacilityGroup() {}
  //====================Row Data Deleting========================
  onRowRemoving(event: any) {
    event.cancel = true;
    let SelectedRow = event.key;
    console.log('selected row data :', SelectedRow);
    this.masterService
      .Remove_Facility_Row_Data(SelectedRow.ID)
      .subscribe(() => {
        try {
          notify(
            {
              message: 'Delete operation successful',
              position: { at: 'top right', my: 'top right' },
              displayTime: 500,
            },
            'success'
          );
        } catch (error) {
          notify(
            {
              message: 'Delete operation failed',
              position: { at: 'top right', my: 'top right' },
              displayTime: 500,
            },
            'error'
          );
        }
        event.component.refresh();
        this.dataGrid.instance.refresh();
        this. get_Facility_Group_dataSource()
      });
  }
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
    FacilityGroupNewFormModule
    
  ],
  providers: [],
  exports: [],
  declarations: [FacilityGroupListComponent],
})
export class FacilityGroupListModule {}

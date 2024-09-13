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
import { FormPopupModule } from 'src/app/components';
import notify from 'devextreme/ui/notify';
import { FacilityRegionNewFormComponent } from '../../POP-UP_PAGES/facility-region-new-form/facility-region-new-form.component';
import { FacilityRegionNewFormModule } from '../../POP-UP_PAGES/facility-region-new-form/facility-region-new-form.component';
import { ReportService } from 'src/app/services/Report-data.service';
import { MasterReportService } from '../master-report.service';

@Component({
  selector: 'app-facility-region',
  templateUrl: './facility-region.component.html',
  styleUrls: ['./facility-region.component.scss'],
  providers: [ReportService],
})
export class FacilityRegionComponent {
  @ViewChild(DxDataGridComponent, { static: true })
  dataGrid: DxDataGridComponent;
  @ViewChild(FacilityRegionNewFormComponent, { static: false })
  facilityRegionComponent: FacilityRegionNewFormComponent;

  dataSource: any;
  //========Variables for Pagination ====================
  readonly allowedPageSizes: any = [5, 10, 'all'];
  displayMode: any = 'full';
  showPageSizeSelector = true;
  showInfo = true;
  showNavButtons = true;
  facilityGroupDatasource: any;
  isAddFormPopupOpened: boolean = false;

  constructor(
    private service: ReportService,
    private masterService: MasterReportService
  ) {}

  ngOnInit(): void {
    this.get_FacilityRegion_Data_List();
  }
  //=========================show new popup=========================
  show_new_Form = () => {
    this.isAddFormPopupOpened = true;
  };

  //========================Get Datasource =======================
  get_FacilityRegion_Data_List() {
    this.masterService.Get_Facility_Region_Data().subscribe((response: any) => {
      this.dataSource = response.data;
    });
  }

  //====================Add data ================================
  onClickSaveNewFacilityRegion = () => {
    const { FacilityregionValue, DescriptionValue } =
      this.facilityRegionComponent.getNewFacilityRegionData();
    this.masterService
      .Insert_FacilityRegion_Data(FacilityregionValue, DescriptionValue)
      .subscribe((response: any) => {
        if (response) {
          this.dataGrid.instance.refresh();
          this.get_FacilityRegion_Data_List();
          notify(
            {
              message: `New Facility region "${FacilityregionValue} ${DescriptionValue}" saved Successfully`,
              position: { at: 'top right', my: 'top right' },
            },
            'success'
          );
        } else {
          notify(
            {
              message: `Your Data Not Saved`,
              position: { at: 'top right', my: 'top right' },
            },
            'error'
          );
        }
      });
  };

  //========================Export data ==========================
  onExporting(event: any) {
    this.service.exportDataGrid(event);
  }

  //====================Row Data Deleting========================
  onRowRemoving(event: any) {
    event.cancel = true;
    let SelectedRow = event.key;
    console.log('selected row data :', SelectedRow);
    this.masterService
      .Remove_FacilityRegion_Row_Data(SelectedRow.ID)
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
        this.get_FacilityRegion_Data_List();
      });
  }
  //===================RTow Data Update==========================
  onRowUpdating(event: any) {
    const updataDate = event.newData;
    const oldData = event.oldData;
    const combinedData = { ...oldData, ...updataDate };
    // console.log('onrowUpdated Data getting ', combinedData);
    let id = combinedData.ID;
    let FacilityRegion = combinedData.FacilityRegion;
    let Description = combinedData.Description;

    this.masterService
      .update_facilityRegion_data(id, FacilityRegion, Description)
      .subscribe((data: any) => {
        if (data) {
          this.dataGrid.instance.refresh();
          this.get_FacilityRegion_Data_List();
          notify(
            {
              message: `New Facility Region updated Successfully`,
              position: { at: 'top right', my: 'top right' },
              displayTime: 500,
            },
            'success'
          );
        } else {
          notify(
            {
              message: `Your Data Not Saved`,
              position: { at: 'top right', my: 'top right' },
              displayTime: 500,
            },
            'error'
          );
        }
        // event.component.refresh();
        event.component.cancelEditData(); // Close the popup
        this.dataGrid.instance.refresh();
      });

    event.cancel = true; // Prevent the default update operation
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
    FormPopupModule,
    FacilityRegionNewFormModule,
  ],
  providers: [],
  exports: [],
  declarations: [FacilityRegionComponent],
})
export class FacilityRegionModule {}

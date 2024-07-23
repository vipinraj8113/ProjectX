import { CommonModule } from '@angular/common';
import { Component, NgModule, ViewChild } from '@angular/core';
import { InsuranceClassificationNewFormModule } from '../../POP-UP_PAGES/insurance-classification-new-form/insurance-classification-new-form.component';
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
import { InsuranceClassificationNewFormComponent } from '../../POP-UP_PAGES/insurance-classification-new-form/insurance-classification-new-form.component';
import { ReportService } from 'src/app/services/Report-data.service';
import { MasterReportService } from '../master-report.service';

@Component({
  selector: 'app-insurance-classification',
  templateUrl: './insurance-classification.component.html',
  styleUrls: ['./insurance-classification.component.scss'],
  providers: [ReportService],
})
export class InsuranceClassificationComponent {
  @ViewChild(DxDataGridComponent, { static: true })
  dataGrid: DxDataGridComponent;
  @ViewChild(InsuranceClassificationNewFormComponent, { static: false })
  InsuranceClassification: InsuranceClassificationNewFormComponent;

  isAddFormPopupOpened: any = false;
  dataSource: any;
  //========Variables for Pagination ====================
  readonly allowedPageSizes: any = [5, 10, 'all'];
  displayMode: any = 'full';
  showPageSizeSelector = true;
  showInfo = true;
  showNavButtons = true;
  facilityGroupDatasource: any;

  constructor(
    private service: ReportService,
    private masterService: MasterReportService
  ) {}

  ngOnInit(): void {
    this.get_insuranceClassification_Data_List();
  }
  //=============Showing the new Facility Form===================
  show_new_InsuranceClassification_Form() {
    this.isAddFormPopupOpened = true;
  }
  //========================Get Datasource =======================
  get_insuranceClassification_Data_List() {
    this.masterService
      .Get_InsuranceClassification_Data()
      .subscribe((response: any) => {
        this.dataSource = response.InsuranceClassification;
      });
  }
  //========================Export data ==========================
  onExporting(event: any) {
    this.service.exportDataGrid(event);
  }
  //====================Add data ================================
  onClickSaveNewInsuranceClassification = () => {
    const { ClassificationValue, DescriptionValue } =
      this.InsuranceClassification.getNewInsuranceClassification();
    this.masterService
      .Insert_InsuranceClassification_Data(
        ClassificationValue,
        DescriptionValue
      )
      .subscribe((response: any) => {
        if (response) {
          this.dataGrid.instance.refresh();
          this.get_insuranceClassification_Data_List();
          notify(
            {
              message: `New Insurance Classification saved Successfully`,
              position: { at: 'top right', my: 'top right' },
            },
            'success'
          );
          this.InsuranceClassification.reset_newInsuranceClassificationFormData();
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

  //====================Row Data Deleting========================
  onRowRemoving(event: any) {
    event.cancel = true;
    let SelectedRow = event.key;
    this.masterService
      .Remove_InsuranceClassification_Data(SelectedRow.ID)
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
        this.get_insuranceClassification_Data_List();
      });
  }
  //===================RTow Data Update==========================
  onRowUpdating(event: any) {
    const updataDate = event.newData;
    const oldData = event.oldData;
    const combinedData = { ...oldData, ...updataDate };
    let id = combinedData.ID;
    let Classification = combinedData.Classification;
    let Description = combinedData.Description;

    this.masterService
      .update_InsuranceClassification_data(id, Classification, Description)
      .subscribe((data: any) => {
        if (data) {
          this.dataGrid.instance.refresh();
          this.get_insuranceClassification_Data_List();
          notify(
            {
              message: `Insurance classification updated Successfully`,
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

        event.component.cancelEditData();
        this.dataGrid.instance.refresh();
      });

    event.cancel = true;
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
    InsuranceClassificationNewFormModule,
  ],
  providers: [],
  exports: [],
  declarations: [InsuranceClassificationComponent],
})
export class InsuranceClassificationModule {}

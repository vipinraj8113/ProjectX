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
import { FormPopupModule } from 'src/app/components';
import { ReportService } from 'src/app/services/Report-data.service';
import { MasterReportService } from '../master-report.service';
import notify from 'devextreme/ui/notify';
import { DataService } from 'src/app/services';
import { ClinicianNewFormModule } from '../../POP-UP_PAGES/clinician-new-form/clinician-new-form.component';
import { ClinicianNewFormComponent } from '../../POP-UP_PAGES/clinician-new-form/clinician-new-form.component';
@Component({
  selector: 'app-clinician',
  templateUrl: './clinician.component.html',
  styleUrls: ['./clinician.component.scss'],
  providers: [DataService, ReportService],
})
export class ClinicianComponent implements OnInit {
  @ViewChild(DxDataGridComponent, { static: true })
  dataGrid: DxDataGridComponent;

  @ViewChild(ClinicianNewFormComponent, { static: false })
  clinicianComponent: ClinicianNewFormComponent;

  isAddClinicianPopupOpened: any = false;
  dataSource: any;
  //========Variables for Pagination ====================
  readonly allowedPageSizes: any = [5, 10, 'all'];
  displayMode: any = 'full';
  showPageSizeSelector = true;
  showInfo = true;
  showNavButtons = true;
  facilityGroupDatasource: any;
  specialityDatasource: any;
  clinicianMajorDatasource: any;
  clinicianProfessionDatasource: any;
  clinicianCategoryDatasource: any;
  genderDatasource: any;

  constructor(
    private service: ReportService,
    private masterService: MasterReportService
  ) {}

  ngOnInit(): void {
    this.get_DropDown_Data();

    this.get_Clinician_Data_List();
  }
  //=========================show new popup=========================
  show_new__Form() {
    this.isAddClinicianPopupOpened = true;
  }

  get_gender_dropDown() {
    this.masterService.get_gender_Data().subscribe((res: any) => {
      this.genderDatasource = res;
    });
  }
  //=============Get Denial Type Drop dwn Data==============================
  get_DropDown_Data() {
    this.masterService.Get_GropDown('SPECIALITY').subscribe((response: any) => {
      this.specialityDatasource = response;
    });

    this.masterService
      .Get_GropDown('CLINICIANMAJOR')
      .subscribe((response: any) => {
        this.clinicianMajorDatasource = response;
      });

    this.masterService
      .Get_GropDown('CLINICIANPROFESSION')
      .subscribe((response: any) => {
        this.clinicianProfessionDatasource = response;
      });

    this.masterService
      .Get_GropDown('CLINICIANCATEGORY')
      .subscribe((response: any) => {
        this.clinicianCategoryDatasource = response;
      });

    // this.masterService.Get_GropDown('GENDER').subscribe((response: any) => {
    //   this.genderDatasource = response;
    // });
  }

  //========================Get Datasource =======================
  get_Clinician_Data_List() {
    this.masterService.get_Clinian_Table_Data().subscribe((response: any) => {
      this.dataSource = response.Clinician;
    });
  }

  //====================Add data ================================
  onClickSaveNewClinician = () => {
    const {
      ClinicianLicense,
      ClinicianName,
      ClinicianShortName,
      SpecialityID,
      MajorID,
      ProfessionID,
      CategoryID,
      Gender,
    } = this.clinicianComponent.getnewClinicianData();
    this.masterService
      .Insert_Clinician_Data(
        ClinicianLicense,
        ClinicianName,
        ClinicianShortName,
        SpecialityID,
        MajorID,
        ProfessionID,
        CategoryID,
        Gender
      )
      .subscribe((response: any) => {
        if (response) {
          this.dataGrid.instance.refresh();
          this.get_Clinician_Data_List();
          notify(
            {
              message: `New Clinician saved Successfully`,
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

  //====================Row Data Deleting========================
  onRowRemoving(event: any) {
    event.cancel = true;
    let SelectedRow = event.key;
    console.log('selected row data :', SelectedRow);
    this.masterService
      .Remove_Clinician_Row_Data(SelectedRow.ID)
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
        this.get_Clinician_Data_List();
      });
  }
  //===================RTow Data Update==========================
  onRowUpdating(event: any) {
    const updataDate = event.newData;
    const oldData = event.oldData;
    const combinedData = { ...oldData, ...updataDate };
    console.log(combinedData);
    let id = combinedData.ID;
    let ClinicianLicense = combinedData.ClinicianLicense;
    let ClinicianName = combinedData.ClinicianName;
    let ClinicianShortName = combinedData.ClinicianShortName;
    let SpecialityID = combinedData.SpecialityID;
    let MajorID = combinedData.MajorID;
    let ProfessionID = combinedData.ProfessionID;
    let CategoryID = combinedData.CategoryID;
    let Gender = combinedData.Gender;

    this.masterService
      .update_Clinician_data(
        id,
        ClinicianLicense,
        ClinicianName,
        ClinicianShortName,
        SpecialityID,
        MajorID,
        ProfessionID,
        CategoryID,
        Gender
      )
      .subscribe((data: any) => {
        if (data) {
          this.dataGrid.instance.refresh();
          this.get_Clinician_Data_List();
          notify(
            {
              message: `New Clinician updated Successfully`,
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
    FormPopupModule,
    ClinicianNewFormModule,
  ],
  providers: [],
  exports: [],
  declarations: [ClinicianComponent],
})
export class ClinicianListModule {}

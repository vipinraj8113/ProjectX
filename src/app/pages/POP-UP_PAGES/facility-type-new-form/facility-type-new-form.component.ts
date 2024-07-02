import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DxFormModule, DxSelectBoxModule, DxTextAreaModule, DxTextBoxModule, DxValidatorModule } from 'devextreme-angular';
import { FormPhotoUploaderModule, FormTextboxModule } from 'src/app/components';
import { MasterReportService } from '../../MASTER PAGES/master-report.service';

@Component({
  selector: 'app-facility-type-new-form',
  templateUrl: './facility-type-new-form.component.html',
  styleUrls: ['./facility-type-new-form.component.scss']
})
export class FacilityTypeNewFormComponent {
  FacilityTypeData = {
    FacilityTypeValue: '',
    DescriptionValue: '',
  };

  newFacilityTypeData = this.FacilityTypeData;
  facilityTypeDatasource: any;
  constructor(private masterService: MasterReportService) {
    // this.get_FacilityGroup_DropDown();
  }

  getNewFacilityTypeData = () => ({ ...this.newFacilityTypeData });

  //==================== Facility group dropdown data loading ========================
  // get_FacilityType_DropDown() {
  //   this.masterService
  //     .Get_GropDown('FACILITYTYPE')
  //     .subscribe((response: any) => {
  //       this.facilityGroupDatasource = response;
  //     });
  // }

}
@NgModule({
  imports: [
    DxTextBoxModule,
    DxFormModule,
    DxValidatorModule,
    FormTextboxModule,
    DxTextAreaModule,
    FormPhotoUploaderModule,
    CommonModule,
    ReactiveFormsModule,
    DxSelectBoxModule,
  ],
  declarations: [FacilityTypeNewFormComponent],
  exports: [FacilityTypeNewFormComponent],
})
export class FacilityTypeNewFormModule {}

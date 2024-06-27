import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  DxFormModule,
  DxSelectBoxModule,
  DxValidatorModule,
} from 'devextreme-angular';
import { DxTextBoxModule } from 'devextreme-angular/ui/text-box';
import { DxTextAreaModule } from 'devextreme-angular';
import { FormPhotoUploaderModule, FormTextboxModule } from 'src/app/components';
import { MasterReportService } from '../../MASTER PAGES/master-report.service';

@Component({
  selector: 'app-facility-group-new-form',
  templateUrl: './facility-group-new-form.component.html',
  styleUrls: ['./facility-group-new-form.component.scss'],
})
export class FacilityGroupNewFormComponent {
  FacilityGroupData = {
    FacilityGroupValue: '',
    DescriptionValue: '',
  };

  newFacilityGroupData = this.FacilityGroupData;
  facilityGroupDatasource: any;
  constructor(private masterService: MasterReportService) {
    this.get_FacilityGroup_DropDown();
  }

  getNewFacilityGroupData = () => ({ ...this.newFacilityGroupData });

  //==================== Facility group dropdown data loading ========================
  get_FacilityGroup_DropDown() {
    this.masterService
      .Get_GropDown('FACILITYGROUP')
      .subscribe((response: any) => {
        this.facilityGroupDatasource = response;
      });
  }
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
  declarations: [FacilityGroupNewFormComponent],
  exports: [FacilityGroupNewFormComponent],
})
export class FacilityGroupNewFormModule {}

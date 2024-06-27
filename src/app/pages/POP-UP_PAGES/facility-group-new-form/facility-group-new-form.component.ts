import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DxFormModule, DxSelectBoxModule, DxValidatorModule } from 'devextreme-angular';
import { DxTextBoxModule } from 'devextreme-angular/ui/text-box';
import { FormPhotoUploaderModule, FormTextboxModule } from 'src/app/components';

@Component({
  selector: 'app-facility-group-new-form',
  templateUrl: './facility-group-new-form.component.html',
  styleUrls: ['./facility-group-new-form.component.scss']
})
export class FacilityGroupNewFormComponent {

}
@NgModule({
  imports: [
    DxTextBoxModule,
    DxFormModule,
    DxValidatorModule,
    FormTextboxModule,
    FormPhotoUploaderModule,
    CommonModule,
    ReactiveFormsModule,
    DxSelectBoxModule,
  ],
  declarations: [FacilityGroupNewFormComponent],
  exports: [FacilityGroupNewFormComponent],
})
export class FacilityGroupNewFormModule {}
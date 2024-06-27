import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxFormModule, DxValidatorModule } from 'devextreme-angular';
import { FormTextboxModule, FormPhotoUploaderModule } from 'src/app/components';
import { getSizeQualifier } from 'src/app/services/screen.service';
import { ReactiveFormsModule } from '@angular/forms';
import { DataService } from 'src/app/services';
import { DxSelectBoxModule } from 'devextreme-angular';
import { DxTextBoxModule } from 'devextreme-angular/ui/text-box';

@Component({
  selector: 'denial-new-form',
  templateUrl: './denial-new-form.component.html',
  styleUrls: ['./denial-new-form.component.scss'],
  providers: [DataService],
})
export class DenialNewFormComponent {
  newDenialData = {
    iD: '',
    DenialCode: '',
    Description: '',
    DenialTypeID: '',
    DenialCategoryID: '',
    CATEGORY_NAME: '',
    TYPE_NAME: '',
  };

  newDenial = this.newDenialData;
  Denial_Type_DropDownData: any;
  Denial_Category_DropDownData: any;
  getSizeQualifier = getSizeQualifier;

  constructor(private service: DataService) {
    this.getDenial_Type_DropDown();
    this.getDenial_Category_DropDown();
  }

  getNewDenialData = () => ({ ...this.newDenial });

  //=============Get Denial Type Drop dwn Data==============================
  getDenial_Type_DropDown() {
    let dropdownType = 'DENIALTYPE';
    this.service
      .get_Denial_Dropdown_Data(dropdownType)
      .subscribe((data: any) => {
        this.Denial_Type_DropDownData = data;
      });
  }

  //=============Get Denial Type Drop dwn Data==============================
  getDenial_Category_DropDown() {
    const dropdowncategory = 'DENIALCATEGORY';
    this.service
      .get_Denial_Dropdown_Data(dropdowncategory)
      .subscribe((data: any) => {
        this.Denial_Category_DropDownData = data;
      });
  }
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
  declarations: [DenialNewFormComponent],
  exports: [DenialNewFormComponent],
})
export class DenialNewFormModule {}

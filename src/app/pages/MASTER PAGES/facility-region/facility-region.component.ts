import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { DxDataGridModule, DxButtonModule, DxDropDownButtonModule, DxSelectBoxModule, DxTextBoxModule, DxLookupModule } from 'devextreme-angular';
import { FormPopupModule } from 'src/app/components';

@Component({
  selector: 'app-facility-region',
  templateUrl: './facility-region.component.html',
  styleUrls: ['./facility-region.component.scss']
})
export class FacilityRegionComponent {

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

  ],
  providers: [],
  exports: [],
  declarations: [FacilityRegionComponent],
})
export class FacilityRegionModule {}

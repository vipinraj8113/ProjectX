import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { DxButtonModule, DxDataGridModule, DxTextBoxModule } from 'devextreme-angular';
import { FormPopupModule } from 'src/app/components';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {

}
@NgModule({
  imports: [
    CommonModule,
    DxDataGridModule,
    DxButtonModule,
    DxTextBoxModule,
    FormPopupModule,
  ],
  providers: [],
  exports: [],
  declarations: [],
})
export class ChangePasswordModule{}
import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { DxCheckBoxModule } from 'devextreme-angular';
import {
  DxTextBoxModule,
  DxTextBoxTypes,
} from 'devextreme-angular/ui/text-box';
import { DxNumberBoxModule } from 'devextreme-angular';
import { DxRadioGroupModule, DxTemplateModule } from 'devextreme-angular';
import { DxRadioGroupTypes } from 'devextreme-angular/ui/radio-group';
@Component({
  selector: 'app-security-policy',
  templateUrl: './security-policy.component.html',
  styleUrls: ['./security-policy.component.scss'],
})
export class SecurityPolicyComponent {
  priorities = ['None', '1', '2', '3','All'];
}
@NgModule({
  imports: [
    CommonModule,
    DxCheckBoxModule,
    DxTextBoxModule,
    DxNumberBoxModule,
    DxRadioGroupModule,
    DxTemplateModule,
  ],
  providers: [],
  exports: [],
  declarations: [SecurityPolicyComponent],
})
export class SecurityPolicyModule {}

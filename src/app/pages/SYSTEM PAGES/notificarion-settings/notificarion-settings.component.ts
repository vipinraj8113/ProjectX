import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import {
  DxTabsModule,
  DxTabsComponent,
  DxTabsTypes,
} from 'devextreme-angular/ui/tabs';
import {
  DxFormModule,
  DxTextBoxModule,
  DxTextAreaModule,
  DxButtonModule,
} from 'devextreme-angular';
import { DxTabPanelModule } from 'devextreme-angular';
@Component({
  selector: 'app-notificarion-settings',
  templateUrl: './notificarion-settings.component.html',
  styleUrls: ['./notificarion-settings.component.scss'],
})
export class NotificationSettingsComponent {
  tabsWithIconAndText: any = [
    {
      id: 0,
      text: 'E-mail',
      icon: 'bi bi-envelope',
    },
    {
      id: 1,
      text: 'SMS',
      icon: 'bi bi-chat-square-text-fill',
    },
    {
      id: 2,
      text: 'WhatsApp',
      icon: 'bi bi-whatsapp',
    },
  ];
  showNavButtons = false;
  scrollByContent = false;
  rtlEnabled = false;
  orientation: any = 'horizontal';
  stylingMode: any = 'secondary';
  iconPosition: any = 'start';
  width = 'auto';
  animationEnabled: any = true;

  widgetWrapperClasses = {
    'widget-wrapper': true,
    'widget-wrapper-horizontal': true,
    'widget-wrapper-vertical': false,
    'strict-width': false,
  };
  emailFormData: any;
  smsFormData: any;
  whatsappFormData: any;
}
@NgModule({
  imports: [CommonModule, DxTabsModule, DxTabPanelModule, DxFormModule],
  providers: [],
  exports: [],
  declarations: [NotificationSettingsComponent],
})
export class NotificationSettingsModule {}

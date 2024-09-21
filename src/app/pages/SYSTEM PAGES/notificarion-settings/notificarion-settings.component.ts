import { Message } from 'src/app/types/messages';
import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { DxTabsModule } from 'devextreme-angular/ui/tabs';
import {
  DxFormModule,
  DxTextBoxModule,
  DxTextAreaModule,
  DxButtonModule,
  DxFormComponent,
  DxCheckBoxModule,
  DxValidatorModule,
  DxValidatorComponent,
  DxPopupModule,
  DxDataGridModule,
  DxDataGridComponent,
} from 'devextreme-angular';
import {
  DxHtmlEditorModule,
  DxHtmlEditorTypes,
} from 'devextreme-angular/ui/html-editor';
import { DxTabPanelModule } from 'devextreme-angular';
import { SystemServicesService } from '../system-services.service';
import { DxTextBoxTypes } from 'devextreme-angular/ui/text-box';
import notify from 'devextreme/ui/notify';

type EditorOptions = DxTextBoxTypes.Properties;
@Component({
  selector: 'app-notificarion-settings',
  templateUrl: './notificarion-settings.component.html',
  styleUrls: ['./notificarion-settings.component.scss'],
})
export class NotificationSettingsComponent implements OnInit {
  @ViewChild(DxFormComponent, { static: false }) form: DxFormComponent;

  @ViewChild(DxValidatorComponent, { static: false })
  validator: DxValidatorComponent;

  @ViewChild(DxDataGridComponent, { static: true })
  dataGrid: DxDataGridComponent;

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

  formData = {
    EmailSenderID: '',
    EmailSenderName: '',
    EmailSenderPassword: '',
    EmailSMTPHost: '',
    EmailSMTPPort: '',
    EmailEnableSSL: false,
    SMSProviderURL: '',
    SMSUserID: '',
    SMSPassword: '',
    SMSMobileNo: '',
    WhatsappSource: '',
    WhatsappNumber: '',
  };

  //========Variables for Pagination ====================
  readonly allowedPageSizes: any = [5, 10, 'all'];
  displayMode: any = 'full';
  showPageSizeSelector = true;
  showInfo = true;
  showNavButtons = true;
  dataSource: any;

  valueContent: string;

  editorValueType: DxHtmlEditorTypes.MarkupType = 'html';

  clickedTabName: string = 'E-mail'; // Set your initial tab

  showTabNavButtons = false;
  scrollByContent = false;
  rtlEnabled = false;
  orientation: any = 'horizontal';
  stylingMode: any = 'secondary';
  iconPosition: any = 'start';
  width = 'auto';
  animationEnabled: any = true;
  emailFormData: any;
  smsFormData: any;
  whatsappFormData: any;

  isPasswordVisible: boolean = false;
  isEmailVisible: boolean;
  isSMSVisible: boolean;
  iswhatsAppVisible: boolean;

  testMailpopupVisible: boolean = false;
  TestMailReceiverID: any = '';
  TestMailSubject: any = '';
  TestMailMessageBody: any = '';

  phonePattern = /^[02-9]\d{9}$/;

  phoneEditorOptions: EditorOptions = {
    mask: '+91 X000000000', // +91 followed by 10 digits
    maskRules: {
      X: /[6-9]/, // Indian mobile numbers start with 6, 7, 8, or 9
    },
    maskInvalidMessage: 'The phone must have a correct Indian mobile format',
    valueChangeEvent: 'keyup',
  };

  constructor(private service: SystemServicesService) {}

  ngOnInit() {
    this.getNotificationSettingsData();
    this.getNotificationSettingsTemplateList();
    this.updateVisibility(); // Set visibility when component is loaded
  }
  //================Only Allow numbers Input ==================
  onInputNumber(event: any): void {
    const input = event.event.target.value;
    event.component.option('value', input.replace(/\D/g, ''));
  }
  //=================Notification Settings Data===============
  getNotificationSettingsData() {
    this.service.getSecurityNotificationDdata().subscribe((response: any) => {
      this.formData = response.data[0];
    });
  }
  //=============Notification Settings Template Data==========
  getNotificationSettingsTemplateList() {
    this.service.getNotificationTemplateList().subscribe((response: any) => {
      response.data.forEach((item: any, index: number) => {
        item.serialNumber = index + 1;
      });
      this.dataSource = response.data;
    });
  }
  // prettierFormat(markup: string) {
  //   if (this.editorValueType === 'html') {
  //     return prettier.format('<div>Hello World</div>', {
  //       parser: 'html',
  //       plugins: [parserHtml],
  //     });
  //   }
  //   return markup;
  // }

  //================Tab Click event===============
  onTabClick(e: any) {
    this.clickedTabName = e.itemData.text;
    this.updateVisibility();
  }
  updateVisibility() {
    this.isEmailVisible = this.clickedTabName === 'E-mail';
    this.isSMSVisible = this.clickedTabName === 'SMS';
    this.iswhatsAppVisible = this.clickedTabName === 'WhatsApp';
  }
  //===============Test Mail Button Click==========
  onClickTestMail() {
    this.testMailpopupVisible = true;
  }

  //==============test mail sending===============
  onTestMailSending() {
    const userID: any = JSON.parse(localStorage.getItem('logData')).UserID;
    const receiverid = this.TestMailReceiverID;
    const subject = this.TestMailSubject;
    const Message = this.TestMailMessageBody;
    this.service
      .sendTestMail(userID, receiverid, subject, Message)
      .subscribe((response: any) => {
        if (response.message) {
          notify(
            {
              message: `The test e-mail has been send Successfully`,
              position: { at: 'top right', my: 'top right' },
            },
            'success'
          );
          this.testMailpopupVisible = false;
        }
      });
  }
  //===========Clear data on popup close===========
  cleardata() {
    this.TestMailReceiverID = '';
    this.TestMailSubject = '';
    this.TestMailMessageBody = '';
  }
  onClickCancel() {}
  //================On Click Save Button============
  onClickSave() {
    const validationResult = this.validator.instance.validate();
    if (validationResult.isValid) {
      console.log('Form Data:', this.formData);
    } else {
      console.log('Form is invalid');
    }
  }
  onRowUpdating(event: any) {}
  //============== Page refreshing==================
  refresh = () => {
    this.dataGrid.instance.refresh();
  };
}
@NgModule({
  imports: [
    CommonModule,
    DxTabsModule,
    DxTabPanelModule,
    DxFormModule,
    DxTextBoxModule,
    DxTextAreaModule,
    DxButtonModule,
    DxCheckBoxModule,
    DxPopupModule,
    DxValidatorModule,
    DxHtmlEditorModule,
    DxDataGridModule,
  ],
  providers: [],
  exports: [],
  declarations: [NotificationSettingsComponent],
})
export class NotificationSettingsModule {}

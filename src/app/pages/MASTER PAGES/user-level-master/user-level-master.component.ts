import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import {
  DxTabPanelModule,
  DxCheckBoxModule,
  DxSelectBoxModule,
  DxTemplateModule,
  DxButtonModule,
  DxDataGridModule,
  DxDataGridComponent,
} from 'devextreme-angular';
import { DxTabsModule } from 'devextreme-angular/ui/tabs';
import { DxTextBoxModule } from 'devextreme-angular/ui/text-box';
import { DxTreeViewModule } from 'devextreme-angular';
import { UserLevelNewFormModule } from '../../POP-UP_PAGES/user-level-new-form/user-level-new-form.component';
import { UserLevelNewFormComponent } from '../../POP-UP_PAGES/user-level-new-form/user-level-new-form.component';
import { FormPopupModule } from 'src/app/components';
import { MasterReportService } from '../master-report.service';
import { ReportService } from 'src/app/services/Report-data.service';

@Component({
  selector: 'app-user-level-master',
  templateUrl: './user-level-master.component.html',
  styleUrls: ['./user-level-master.component.scss'],
  providers: [MasterReportService, ReportService],
})
export class UserLevelMasterComponent {
  @ViewChild(DxDataGridComponent, { static: true })
  dataGrid: DxDataGridComponent;

  popup_width: any = '60%';
  isAddFormVisible: boolean = false;
  dataSource: any;
  //========Variables for Pagination ====================
  readonly allowedPageSizes: any = [5, 10, 'all'];
  displayMode: any = 'full';
  showPageSizeSelector = true;
  showInfo = true;
  showNavButtons = true;
  facilityGroupDatasource: any;
  isAddFormPopupOpened: boolean = false;

  constructor(
    private masterService: MasterReportService,
    private service: ReportService
  ) {}

  //=================== Page refreshing==========================
  refresh = () => {
    this.dataGrid.instance.refresh();
  };
  //========================Export data ==========================
  onExporting(event: any) {
    this.service.exportDataGrid(event);
  }
  //=======================row data update=======================
  onRowUpdating(event: any) {}

  //=======================row data removing ====================
  onRowRemoving(event: any) {}

  show_new_Form() {
    this.isAddFormVisible = true;
  }
}
@NgModule({
  imports: [
    CommonModule,
    DxTabPanelModule,
    DxCheckBoxModule,
    DxSelectBoxModule,
    DxTemplateModule,
    DxTabsModule,
    DxTextBoxModule,
    DxButtonModule,
    DxDataGridModule,
    DxTreeViewModule,
    FormPopupModule,
    UserLevelNewFormModule,
  ],
  providers: [],
  exports: [],
  declarations: [UserLevelMasterComponent],
})
export class UserLevelMasterModule {}

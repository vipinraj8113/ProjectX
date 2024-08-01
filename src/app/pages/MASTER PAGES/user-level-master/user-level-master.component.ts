import { CommonModule } from '@angular/common';
import { Component, NgModule, ViewChild } from '@angular/core';
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
import {
  DxTextBoxModule,
  DxTextBoxTypes,
} from 'devextreme-angular/ui/text-box';

@Component({
  selector: 'app-user-level-master',
  templateUrl: './user-level-master.component.html',
  styleUrls: ['./user-level-master.component.scss'],
})
export class UserLevelMasterComponent {
  @ViewChild('dataGrid', { static: false }) dataGrid: DxDataGridComponent;
  tabposition: any = 'top';
  stylingMode: any = 'primary';
  iconPosition: any = 'left';
  width: any = 'auto';
  rtlEnabled = false;
  showNavButtons = false;
  scrollByContent = false;
  orientations: any = 'horizontal';

  selectedRows = {};
  allTabData = {};

  tabPanelItems = [
    {
      icon: 'description',
      text: 'Reports',
      menus: [
        {
          status: 'Not Started',
          priority: 'medium',
          text: 'Training',
          date: '2023/09/16',
          assignedBy: 'Arthur Miller',
        },
        {
          status: 'Not Started',
          priority: 'medium',
          text: 'NDA',
          date: '2023/09/16',
          assignedBy: 'Robert Reagan',
        },
        {
          status: 'Not Started',
          priority: 'low',
          text: 'Health Insurance',
          date: '2023/09/16',
          assignedBy: 'Greta Sims',
        },
      ],
    },
    {
      icon: 'taskhelpneeded',
      text: 'Activity',
      menus: [
        {
          status: 'Help Needed',
          priority: 'low',
          text: 'Recall and Refund Forms',
          date: '2023/09/16',
          assignedBy: 'Sandra Johnson',
        },
        {
          status: 'Help Needed',
          priority: 'high',
          text: 'Shippers',
          date: '2023/09/16',
          assignedBy: 'Ed Holmes',
        },
        {
          status: 'Help Needed',
          priority: 'medium',
          text: 'Hardware Upgrade',
          date: '2023/09/16',
          assignedBy: 'Barb Banks',
        },
      ],
    },
    {
      icon: 'taskinprogress',
      text: 'Masters',
      menus: [
        {
          status: 'In Progress',
          priority: 'low',
          text: 'Bandwidth Increase',
          date: '2023/09/16',
          assignedBy: 'Davey Jones',
        },
        {
          status: 'In Progress',
          priority: 'medium',
          text: 'Support',
          date: '2023/09/16',
          assignedBy: 'Victor Norris',
        },
        {
          status: 'In Progress',
          priority: 'low',
          text: 'Training Material',
          date: '2023/09/16',
          assignedBy: 'John Heart',
        },
      ],
    },
    {
      icon: 'taskstop',
      text: 'ERX',
      menus: [
        {
          status: 'Deferred',
          priority: 'high',
          text: 'Automation Server',
          date: '2023/09/16',
          assignedBy: 'Arthur Miller',
        },
        {
          status: 'Deferred',
          priority: 'medium',
          text: 'Retail Sales',
          date: '2023/09/16',
          assignedBy: 'Robert Reagan',
        },
        {
          status: 'Deferred',
          priority: 'medium',
          text: 'Shipping Labels',
          date: '2023/09/16',
          assignedBy: 'Greta Sims',
        },
      ],
    },
    {
      icon: 'taskrejected',
      text: 'System',
      menus: [
        {
          status: 'Rejected',
          priority: 'high',
          text: 'Schedule Meeting with Sales Team',
          date: '2023/09/16',
          assignedBy: 'Sandra Johnson',
        },
        {
          status: 'Rejected',
          priority: 'medium',
          text: 'Confirm Availability for Sales Meeting',
          date: '2023/09/16',
          assignedBy: 'Ed Holmes',
        },
        {
          status: 'Rejected',
          priority: 'medium',
          text: 'Reschedule Sales Team Meeting',
          date: '2023/09/16',
          assignedBy: 'Barb Banks',
        },
      ],
    },
  ];

  selectedTabData = this.tabPanelItems[0].menus;
  gridColumns = ['status', 'priority', 'text', 'date', 'assignedBy'];
  selectedTabIndex: any;
  selectedTab: any;

  // constructor() {
  //   this.tabPanelItems.forEach((tab, index) => {
  //     this.selectedRows[index] = [];
  //     this.allTabData[index] = tab.menus;
  //   });
  // }

  // onContentReady(e:any) {
  //   this.getAllRows();
  //   this.getSelectedRows();
  // }

  // getAllRows() {
  //   const allRows = this.dataGrid.instance
  //     .getVisibleRows()
  //     .map((row) => row.data);
  //   console.log('All Rows:', allRows);
  // }

  // getSelectedRows() {
  //   const selectedRows = this.dataGrid.instance.getSelectedRowKeys();
  //   console.log('Selected Rows:', selectedRows);
  // }
  //================Tab change event for changing datagrid data============
  onTabClick(e: any) {
    this.selectedTab = e.itemData;
    this.selectedTabIndex = e.component.option('selectedIndex');
    this.selectedTabData = this.selectedTab.menus;
  }
  //===================store selected data of datagrid====================
  onSelectionChanged(e: any) {
    this.selectedRows[this.selectedTabIndex] = e.selectedRowKeys;
    console.log('rows for tab', e);
  }

  onClickSaveData() {}
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
  ],
  providers: [],
  exports: [],
  declarations: [UserLevelMasterComponent],
})
export class UserLevelMasterModule {}

import { CommonModule } from '@angular/common';
import { Component, NgModule, OnChanges, OnInit } from '@angular/core';
import {
  DxTabPanelModule,
  DxCheckBoxModule,
  DxSelectBoxModule,
  DxTemplateModule,
  DxTabsModule,
  DxTextBoxModule,
  DxButtonModule,
  DxDataGridModule,
  DxTreeViewModule,
} from 'devextreme-angular';
import { MasterReportService } from '../../MASTER PAGES/master-report.service';

@Component({
  selector: 'app-user-level-new-form',
  templateUrl: './user-level-new-form.component.html',
  styleUrls: ['./user-level-new-form.component.scss'],
  providers: [MasterReportService],
})
export class UserLevelNewFormComponent implements OnInit {
  MenuDatasource = [
    {
      icon: 'description',
      text: 'Reports',
      Menus: [
        {
          MenuName: 'Not Started',
          priority: 'medium',
          text: 'Training',
          date: '2023/09/16',
          assignedBy: 'Arthur Miller',
        },
        {
          MenuName: 'Not Started',
          priority: 'medium',
          text: 'NDA',
          date: '2023/09/16',
          assignedBy: 'Robert Reagan',
        },
        {
          MenuName: 'Not Started',
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
      Menus: [
        {
          MenuName: 'Help Needed',
          priority: 'low',
          text: 'Recall and Refund Forms',
          date: '2023/09/16',
          assignedBy: 'Sandra Johnson',
        },
        {
          MenuName: 'Help Needed',
          priority: 'high',
          text: 'Shippers',
          date: '2023/09/16',
          assignedBy: 'Ed Holmes',
        },
        {
          MenuName: 'Help Needed',
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
      Menus: [
        {
          MenuName: 'In Progress',
          priority: 'low',
          text: 'Bandwidth Increase',
          date: '2023/09/16',
          assignedBy: 'Davey Jones',
        },
        {
          MenuName: 'In Progress',
          priority: 'medium',
          text: 'Support',
          date: '2023/09/16',
          assignedBy: 'Victor Norris',
        },
        {
          MenuName: 'In Progress',
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
      Menus: [
        {
          MenuName: 'Deferred',
          priority: 'high',
          text: 'Automation Server',
          date: '2023/09/16',
          assignedBy: 'Arthur Miller',
        },
        {
          MenuName: 'Deferred',
          priority: 'medium',
          text: 'Retail Sales',
          date: '2023/09/16',
          assignedBy: 'Robert Reagan',
        },
        {
          MenuName: 'Deferred',
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
      Menus: [
        {
          MenuName: 'Rejected',
          priority: 'high',
          text: 'Schedule Meeting with Sales Team',
          date: '2023/09/16',
          assignedBy: 'Sandra Johnson',
        },
        {
          MenuName: 'Rejected',
          priority: 'medium',
          text: 'Confirm Availability for Sales Meeting',
          date: '2023/09/16',
          assignedBy: 'Ed Holmes',
        },
        {
          MenuName: 'Rejected',
          priority: 'medium',
          text: 'Reschedule Sales Team Meeting',
          date: '2023/09/16',
          assignedBy: 'Barb Banks',
        },
      ],
    },
  ];
  width: any = '100%';
  rtlEnabled: boolean = false;
  scrollByContent: boolean = true;
  showNavButtons: boolean = true;
  orientations: any = 'horizontal';
  stylingMode: any = 'primary';
  iconPosition: any = 'left';
  selectedTabData: any[] = [];
  selectedRows: { [key: number]: any[] } = {};
  selectedTab: number = 0;
  gridColumns = ['MenuName'];
  allSelectedRows: any[] = [];
  // MenuDatasource: any;

  constructor(private masterservice: MasterReportService) {}

  ngOnInit(): void {
    this.get_All_MenuList();

    // //========Initialize selectedRows for each tab======
    // this.MenuDatasource.forEach((tab, index) => {
    //   this.selectedRows[index] = [];
    // });

    // //==========Set the data for the initial tab========
    // this.selectedTabData = this.MenuDatasource[0].Menus;
    // console.log("selected tab is :", this.selectedTabData )
  }

  //==============All Menu List========================
  get_All_MenuList() {
    // this.masterservice.get_userLevel_menuList().subscribe((response: any) => {
    //   this.MenuDatasource = response.Data;
    // });
       //========Initialize selectedRows for each tab======
  this.MenuDatasource.forEach((tab, index) => {
    this.selectedRows[index] = [];
  });

    //==========Set the data for the initial tab========
  this.selectedTabData = this.MenuDatasource[0].Menus;
  console.log("selected tab is :", this.selectedTabData )
  }

  onTabClick(event: any): void {
    this.selectedTab = event.itemIndex;
    this.selectedTabData = this.MenuDatasource[this.selectedTab].Menus;
    // console.log("selected tab is :", this.selectedTabData )
  }

  onSelectionChanged(event: any): void {
    this.selectedRows[this.selectedTab] = event.selectedRowsData;
    this.combineSelectedRows();
  }

  combineSelectedRows(): void {
    this.allSelectedRows = Object.keys(this.selectedRows)
      .filter((key) => this.selectedRows[key].length > 0)
      .map((key) => ({
        icon:this.MenuDatasource[key].icon,
        text: this.MenuDatasource[key].text,
        Menus: this.selectedRows[key],
      }));

    console.log('all selected row data :', this.allSelectedRows);
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
  ],
  providers: [],
  declarations: [UserLevelNewFormComponent],
  exports: [UserLevelNewFormComponent],
})
export class UserLevelNewFormModule {}

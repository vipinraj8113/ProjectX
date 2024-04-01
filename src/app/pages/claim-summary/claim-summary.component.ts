import { Component, ViewChild, NgModule } from '@angular/core';
import {
  DxButtonModule,
  DxDataGridModule,
  DxDataGridComponent,
  DxDropDownButtonModule,
  DxSelectBoxModule,
  DxTextBoxModule,
} from 'devextreme-angular';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { exportDataGrid as exportDataGridToXLSX } from 'devextreme/excel_exporter';
// import { CardActivitiesModule, ContactStatusModule } from 'src/app/components';
import DataSource from 'devextreme/data/data_source';
import { CommonModule } from '@angular/common';
import { DataService } from 'src/app/services';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver-es';
import { jsPDF } from 'jspdf';
import notify from 'devextreme/ui/notify';
import { FormPopupModule } from 'src/app/components';
import { ContactPanelModule } from 'src/app/components/library/contact-panel/contact-panel.component';
import {
  DenialNewFormComponent,
  DenialNewFormModule,
} from 'src/app/components/library/denial-new-form/denial-new-form.component';
import { DxLookupModule } from 'devextreme-angular';
import { Router, ActivatedRoute } from '@angular/router';

interface dropdownData {
  ID: number;
  Description: string;
}

@Component({
  templateUrl: './claim-summary.component.html',
  styleUrls: ['./claim-summary.component.scss'],
  providers: [DataService],
})
export class ClaimSummaryComponent {
  @ViewChild(DxDataGridComponent, { static: true })
  dataGrid: DxDataGridComponent;

  @ViewChild(DenialNewFormComponent, { static: false })
  denialComponent: DenialNewFormComponent;

  isPanelOpened = false;

  isAddContactPopupOpened = false;

  selectedItemKeys: any[] = [];
  Denial_Type_DropDownData: dropdownData[];
  Denial_category_DropDownData: dropdownData[];
  ID: any;

  dataSource = new DataSource<any>({
    load: () =>
      new Promise((resolve, reject) => {
        this.service.getDenialsData().subscribe({
          next: (data: any) => resolve(data),
          error: ({ message }) => reject(message),
        });
      }),
  });

  constructor(
    private service: DataService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.getDenial_Type_DropDown();
    this.getDenial_Category_DropDown();
  }

  addContact() {
    this.isAddContactPopupOpened = true;
  }

  refresh = () => {
    this.dataGrid.instance.refresh();
  };

  // onPinnedChange = () => {
  //   this.dataGrid.instance.updateDimensions();
  // };

  // onSelectionChanged(data: any) {
  //   this.selectedItemKeys = data.selectedRowKeys;
  // }

  //================Exporting Function=====================
  onExporting(e) {
    if (e.format === 'pdf') {
      const doc = new jsPDF();
      exportDataGridToPdf({
        jsPDFDocument: doc,
        component: e.component,
      }).then(() => {
        doc.save('Denials.pdf');
      });
    } else {
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet('Denials');

      exportDataGridToXLSX({
        component: e.component,
        worksheet,
        autoFilterEnabled: true,
      }).then(() => {
        workbook.xlsx.writeBuffer().then((buffer) => {
          saveAs(
            new Blob([buffer], { type: 'application/octet-stream' }),
            'Denials.xlsx'
          );
        });
      });
      e.cancel = true;
    }
  }

  //============ADD NEW DENIALS======================

  onClickSaveNewDenial = () => {
    const { DenialCode, Description, DenialTypeID, DenialCategoryID } =
      this.denialComponent.getNewDenialData();
    console.log(
      'data kittiiiiiii',
      DenialCode,
      Description,
      DenialTypeID,
      DenialCategoryID
    );
    this.service
      .addDenial(DenialCode, Description, DenialTypeID, DenialCategoryID)
      .subscribe((result: any) => {
        if (result) {
          this.dataGrid.instance.refresh();
          notify(
            {
              message: `New Denial "${DenialCode} ${Description} ${DenialTypeID} ${DenialCategoryID}" saved Successfully`,
              position: { at: 'top center', my: 'top center' },
            },
            'success'
          );
        } else {
          notify(
            {
              message: `Your Data Not Saved`,
              position: { at: 'top right', my: 'top right' },
            },
            'error'
          );
        }
      });
  };

  //====================Update Denial Row Data==============

  onRowUpdating(event) {
    const updataDate = event.newData;
    const oldData = event.oldData;
    const combinedData = { ...oldData, ...updataDate };
    console.log('onrowUpdated Data getting ', combinedData);

    let code = combinedData.DenialCode;
    let Description = combinedData.Description;
    let DenialTypeID = combinedData.DenialTypeID;
    let DenialCategoryID = combinedData.DenialCategoryID;

    this.service
      .updateDenial(code, Description, DenialTypeID, DenialCategoryID)
      .subscribe((data: any) => {
        if (data) {
          notify(
            {
              message: `New Denial updated Successfully`,
              position: { at: 'top center', my: 'top center' },
            },
            'success'
          );
          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => {
              this.router.navigate([this.route.snapshot.url.join('/')]);
            });
        } else {
          notify(
            {
              message: `Your Data Not Saved`,
              position: { at: 'top right', my: 'top right' },
            },
            'error'
          );
        }
      });

    event.cancel = true; // Prevent the default update operation
  }

  // =================Remove Denial=========================
  onRowRemoving(event: any) {
    var SelectedRow = event.key;
    console.log('selected row data :', SelectedRow);
    this.service.removeDenial(SelectedRow.ID).subscribe(() => {
      try {
        notify(
          {
            message: 'Delete operation successful',
            position: { at: 'top right', my: 'top right' },
          },
          'success'
        );
        this.dataGrid.instance.refresh();
        window.location.reload();
      } catch (error) {
        notify(
          {
            message: 'Delete operation failed',
            position: { at: 'top right', my: 'top right' },
          },
          'error'
        );
      }
    });
  }

  //=============Get Denial Type Drop dwn Data==============================
  getDenial_Type_DropDown() {
    let dropdownType = 'DENIALTYPE';
    this.service
      .get_Denial_Dropdown_Data(dropdownType)
      .subscribe((data: any) => {
        this.Denial_Type_DropDownData = data;
        console.log('drop down dataaaaaaaaa', this.Denial_Type_DropDownData);
      });
  }

  //=============Get Denial Type Drop dwn Data==============================
  getDenial_Category_DropDown() {
    let dropdownType = 'DENIALCATEGORY';
    this.service
      .get_Denial_Dropdown_Data(dropdownType)
      .subscribe((data: any) => {
        this.Denial_category_DropDownData = data;
        console.log(
          'drop down dataaaaaaaaa',
          this.Denial_category_DropDownData
        );
      });
  }
}

@NgModule({
  imports: [
    DxButtonModule,
    DxDataGridModule,
    DxDropDownButtonModule,
    DxSelectBoxModule,
    DxTextBoxModule,
    DxLookupModule,
    ContactPanelModule,
    DenialNewFormModule,
    FormPopupModule,
    CommonModule,
  ],
  providers: [],
  exports: [],
  declarations: [ClaimSummaryComponent],
})
export class ClaimSummaryModule {}

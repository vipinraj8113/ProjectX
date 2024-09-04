import { Injectable, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';

@Injectable({
  providedIn: 'root',
})
export class ReportEngineService {
  private sharedData: any[] = [];

  constructor() {}
  // ========================================================
  setData(data: any[]) {
    this.sharedData = data;
  }
  getData(): any {
    return this.sharedData;
  }
  // ========================================================
  //================Column location finding==================
  makeColumnVisible(dataGrid: DxDataGridComponent, columnName: string) {
    const columns = dataGrid.instance.getVisibleColumns();
    const columnIndex = columns.findIndex(
      (column) => column.dataField === columnName
    );

    if (columnIndex !== -1) {
      const columnWidth = 200; // Adjust this value to fit your column width
      const scrollLeft = (columnIndex - 1) * columnWidth;
      dataGrid.instance.getScrollable().scrollTo({ left: scrollLeft });

      dataGrid.instance.columnOption(
        columnName,
        'cssClass',
        'highlighted-column'
      );
      setTimeout(() => {
        dataGrid.instance.columnOption(columnName, 'cssClass', null);
      }, 3000); // 3000 milliseconds = 3 seconds
    }
  }
}

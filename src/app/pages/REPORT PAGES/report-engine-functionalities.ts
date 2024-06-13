import { Injectable } from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import { jsPDF } from 'jspdf';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver-es';
import { FormGroup } from '@angular/forms';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { exportDataGrid as exportDataGridToXLSX } from 'devextreme/excel_exporter';

@Injectable({
  providedIn: 'root',
})
export class ReportService {


}

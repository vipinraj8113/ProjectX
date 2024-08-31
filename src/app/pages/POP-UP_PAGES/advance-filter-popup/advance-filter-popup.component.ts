import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';

@Component({
  selector: 'app-advance-filter-popup',
  templateUrl: './advance-filter-popup.component.html',
  styleUrls: ['./advance-filter-popup.component.scss'],
})
export class AdvanceFilterPopupComponent {}
@NgModule({
  imports: [CommonModule],
  declarations: [AdvanceFilterPopupComponent],
  exports: [AdvanceFilterPopupComponent],
})
export class AdvanceFilterPopupModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatStepperModule, MatCheckboxModule, MatMenuModule, MatTooltipModule, MatDatepickerModule, MatRippleModule, MatChipsModule, MatExpansionModule, MatPaginatorModule, MatSortModule, MatSnackBarModule, MatTableModule, MatTabsModule, MatSlideToggleModule, MatButtonToggleModule, MatListModule } from '@angular/material';
import { FMDatepickerComponent } from '../fm-datepicker/fm-datepicker.component';

import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import * as moment from 'moment';

// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY/MM/DD',
  },
  display: {
    dateInput: 'YYYY/MM/DD',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@NgModule({
  declarations: [
    FMDatepickerComponent
  ],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
  imports: [
    FormsModule, ReactiveFormsModule,
    // Material
    MatButtonModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatStepperModule,
    MatCheckboxModule,
    MatMenuModule,
    
    MatTooltipModule,
    MatDatepickerModule,
    MatRippleModule,
    MatSlideToggleModule,

    MatButtonToggleModule,
    MatListModule

  ],
  exports: [
    // Material
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatStepperModule,
    MatCheckboxModule,
    MatMenuModule,
    
    MatTooltipModule,
    MatDatepickerModule,
    MatRippleModule,

    MatChipsModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    MatTableModule,
    MatTabsModule,
    MatSlideToggleModule,

    MatButtonToggleModule,
    MatListModule,

    //custom components
    FMDatepickerComponent
  ]
})
export class MaterialComponentsModule { }

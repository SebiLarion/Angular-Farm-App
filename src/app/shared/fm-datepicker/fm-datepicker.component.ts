import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import * as moment from 'moment';

// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@Component({
  selector: 'fm-datepicker',
  templateUrl: './fm-datepicker.component.html',
  styleUrls: ['./fm-datepicker.component.scss'],
  providers: [

    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class FMDatepickerComponent implements OnInit {
    @Input() label = '';
    @Input() date = moment();
    @Output() onDateChanged: EventEmitter<any> = new EventEmitter<any>();

    dateField = new FormControl(moment());

  constructor() {
    
   }

  ngOnInit() {
      console.log(this.date);
      this.dateField = new FormControl(this.date);
  }

  change(dateEvent) {
    
    this.onDateChanged.emit({ value: dateEvent.value, simpleDate: moment(dateEvent).format('YYYY/MM/DD') })
  }


}

// Usage
/*
<fm-datepicker [class]="'mr-sm-12'" fxFlex
    (onDateChanged)="createdOnChanged($event)"
    [date]="item.createdOn"
    [label]="'Created on'"></fm-datepicker>

createdOnChanged(event) {
    console.log('CreatedOn date: ', event);
}
*/

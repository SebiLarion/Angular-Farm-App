import { Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, fromEvent, merge, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';

import { takeUntil } from 'rxjs/internal/operators';

@Component({
    selector     : 'fm-customers-list',
    templateUrl  : './customers-list.component.html',
    styleUrls    : ['./customers-list.component.scss'],
    animations   : fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class CustomersListComponent 
{
    
}

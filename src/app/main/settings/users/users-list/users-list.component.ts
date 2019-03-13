import { Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, fromEvent, merge, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';

import { takeUntil } from 'rxjs/internal/operators';
import { UsersService } from '../users.service';

@Component({
    selector     : 'fm-users-list',
    templateUrl  : './users-list.component.html',
    styleUrls    : ['./users-list.component.scss'],
    animations   : fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class UsersListComponent implements OnInit, OnDestroy
{
    dataSource: FilesDataSource | null;
    displayedColumns = ['id', 'email', 'firstname', 'lastname', 'company', 'phone', 'admin', 'holdingadmin','livestock','agriculture'];

    @ViewChild(MatPaginator)
    paginator: MatPaginator;

    @ViewChild('filter')
    filter: ElementRef;

    @ViewChild(MatSort)
    sort: MatSort;

    private _unsubscribeAll: Subject<any>;

    constructor(
        private _itemsService: UsersService
    )
    {
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void
    {
        this.dataSource = new FilesDataSource(this._itemsService, this.paginator, this.sort);

        fromEvent(this.filter.nativeElement, 'keyup')
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if ( !this.dataSource )
                {
                    return;
                }
                this.dataSource.filter = this.filter.nativeElement.value;
            });
    }

    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}

export class FilesDataSource extends DataSource<any>
{
    // Private
    private _filterChange = new BehaviorSubject('');
    private _filteredDataChange = new BehaviorSubject('');

    constructor(
        private _itemsService: UsersService,
        private _matPaginator: MatPaginator,
        private _matSort: MatSort
    )
    {
        super();

        this.filteredData = this._itemsService.items;
    }

    get filteredData(): any
    {
        return this._filteredDataChange.value;
    }

    set filteredData(value: any)
    {
        this._filteredDataChange.next(value);
    }

    // Filter
    get filter(): string
    {
        return this._filterChange.value;
    }

    set filter(filter: string)
    {
        this._filterChange.next(filter);
    }

    //  * Connect function called by the table to retrieve one stream containing the data to render.
    connect(): Observable<any[]>
    {
        const displayDataChanges = [
            this._itemsService.onItemsChanged,
            this._matPaginator.page,
            this._filterChange,
            this._matSort.sortChange
        ];

        return merge(...displayDataChanges).pipe(map(() => {

                let data = this._itemsService.items.slice();

                data = this.filterData(data);

                this.filteredData = [...data];

                data = this.sortData(data);
                console.log('CONNECT:', data);

                // Grab the page's slice of data.
                const startIndex = this._matPaginator.pageIndex * this._matPaginator.pageSize;
                return data.splice(startIndex, this._matPaginator.pageSize);
            })
        );

    }


    filterData(data): any
    {
        if ( !this.filter )
        {
            return data;
        }
        return FuseUtils.filterArrayByString(data, this.filter);
    }


    sortData(data): any[]
    {
        console.log('sort:', data);
        if ( !this._matSort.active || this._matSort.direction === '' )
        {
            return data;
        }

        return data.sort((a, b) => {
            let propertyA: number | string = '';
            let propertyB: number | string = '';
           
        switch ( this._matSort.active )
            {
                case 'id':
                    [propertyA, propertyB] = [a.id, b.id];
                    break;
                case 'email':
                    [propertyA, propertyB] = [a.email, b.email];
                    break;
                case 'firstname':
                    [propertyA, propertyB] = [a.firstname, b.firstname];
                    break;
                case 'lastname':
                    [propertyA, propertyB] = [a.lastname, b.lastname];
                    break;
                case 'company':
                    [propertyA, propertyB] = [a.company, b.company];
                    break;
                case 'phone':
                    [propertyA, propertyB] = [a.phone, b.phone];
                    break;
                case 'admin':
                    [propertyA, propertyB] = [a.admin, b.admin];
                    break;
                case 'holdingadmin':
                    [propertyA, propertyB] = [a.holdingadmin, b.holdingadmin];
                    break;
                case 'livestock':
                    [propertyA, propertyB] = [a.livestock, b.livestock];
                    break;
                case 'agriculture':
                    [propertyA, propertyB] = [a.agriculture, b.agriculture];
                    break;
            }

            const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

            return (valueA < valueB ? -1 : 1) * (this._matSort.direction === 'asc' ? 1 : -1);
        });
    }

    disconnect(): void
    {
    }
}

// 

import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';

import { Unit } from '../unit.model';
import { UnitService } from '../unit.service';

@Component({
    selector     : 'fm-unit',
    templateUrl  : './unit.component.html',
    styleUrls    : ['./unit.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations,
})
export class UnitComponent implements OnInit, OnDestroy
{
    item: Unit;
    pageType: string;
    form: FormGroup;
    latestSavedData: any;
    // View/Edit Mode
    editMode: boolean = false;
    setViewMode() { this.editMode = false; this.form && this.form.disable(); }
    setEditMode() { this.editMode = true; this.form && this.form.enable(); }
    // View/Edit Mode

    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        private _itemService: UnitService,
        private _formBuilder: FormBuilder,
        private _location: Location,
        private _matSnackBar: MatSnackBar
    )
    {
        // Set the default
        this.item = new Unit();
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void
    {
        // Subscribe to update item on changes
        this._itemService.onItemChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(item => {

                if ( item )
                {
                    this.pageType = 'edit';
                    this.item = new Unit(item); 
                    console.log('ITEM EDITED:', item, this.item);
                    this.setViewMode(); // hack: add this line if form is using mat-slide-toggle fields
                    this.form = this.createForm();
                    this.setViewMode();
                }
                else
                {
                    this.pageType = 'new';
                    this.item = new Unit();
                    this.form = this.createForm();
                    this.setEditMode();
                }
                
                console.log('FormGroup', this.form);
                // keep latest data (we need to reset data)
                this.latestSavedData = this.getFormData();
            });

            
    }

    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    createForm(): FormGroup
    {

        return this._formBuilder.group({
            id:           [this.item.id],
            code:         [this.item.code],
            name:         [this.item.name],
            description:  [this.item.description],
            act:          [this.item.act],
            tax:          [this.item.tax],
            discount:     [this.item.discount],
            total:        [this.item.total],
            createdOn:    [this.item.createdOn],
            updatedOn:    [this.item.updatedOn],
        });
    }

    save(): void
    {
        const data = this.getFormData();
        data.createdOn = data.createdOn.format('YYYY/MM/DD');
        data.updatedOn = data.updatedOn.format('YYYY/MM/DD');

        this._itemService.saveItem(data)
            .then(() => {

                // Trigger the subscription with new data
                this._itemService.onItemChanged.next(data);

                // Show the success message
                this._matSnackBar.open('Unit saved', 'OK', {
                    verticalPosition: 'top',
                    duration        : 2000
                });
            });
    }

    add(): void
    {
        const data = this.getFormData();

        this._itemService.addItem(data)
            .then(() => {

                // Trigger the subscription with new data
                this._itemService.onItemChanged.next(data);

                // Show the success message
                this._matSnackBar.open('Unit added', 'OK', {
                    verticalPosition: 'top',
                    duration        : 2000
                });

                // Change the location with new one
                this._location.go('items/' + this.item.id);
            });
    }

    getFormData() {
        let formData = this.form.getRawValue();
        if (!formData.id) formData.id = FuseUtils.generateGUID();
        return formData;
    }

    cancel() {
        this.setViewMode();
        this.form.patchValue(this.latestSavedData);
    }

    edit() {
        this.setEditMode();
    }
}

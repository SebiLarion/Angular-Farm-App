import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


import { fuseAnimations } from '@fuse/animations';
import { CustomerService } from '../customer.service';
import { Customer } from '../customer.model';
import { FuseUtils } from '@fuse/utils';


@Component({
    selector     : 'fm-customer',
    templateUrl  : './customer.component.html',
    styleUrls    : ['./customer.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations,

})
export class CustomerComponent 
{
   
    item: Customer;
    pageType: string;
    form: FormGroup ;
    latestSavedData: any;
    // View/Edit Mode
    editMode: boolean = false;
    setViewMode() { this.editMode = false; this.form && this.form.disable(); }
    setEditMode() { this.editMode = true; this.form && this.form.enable(); }
    // View/Edit Mode

    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        private _itemService: CustomerService,
        private _formBuilder: FormBuilder,
        private _location: Location,
        private _matSnackBar: MatSnackBar
    )
    {
        // Set the default
        this.item = new Customer();
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
                    this.item = new Customer(item); 
                    console.log('ITEM EDITED:', item, this.item);
                    this.setViewMode(); // hack: add this line if form is using mat-slide-toggle fields
                    this.form = this.createForm();
                    this.setViewMode();
                }
                else
                {
                    this.pageType = 'new';
                    this.item = new Customer();
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
            id:              [this.item.id],
            code:            [this.item.code],
            name:            [this.item.name],
            description:     [this.item.description],
            active:          [this.item.active],
            recordOnly:      [this.item.recordOnly],
            //General
            detDescription:  [this.item.detDescription],
            address:         [this.item.address],
            postalCode:      [this.item.postalCode],
            country:         [this.item.country],
            contactPerson:   [this.item.contactPerson],
            phone:           [this.item.phone],
            email:           [this.item.email],
            taxNumber:       [this.item.taxNumber],
            otherInfo:       [this.item.otherInfo],
            //Contract Prices
            item:            [this.item.item],
            price:           [this.item.price],
            currency:        [this.item.currency],
            discount:        [this.item.discount],
             //Meta
            createdOn:       [this.item.createdOn],
            updatedOn:       [this.item.updatedOn],
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

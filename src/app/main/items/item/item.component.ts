import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';

import { Item } from '../item.model';
import { ItemService } from '../item.service';

@Component({
    selector     : 'fm-item',
    templateUrl  : './item.component.html',
    styleUrls    : ['./item.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations,

})
export class ItemComponent implements OnInit, OnDestroy
{
    item: Item;
    pageType: string;
    itemForm: FormGroup;
    latestSavedData: any;
    // View/Edit Mode
    editMode: boolean = false;
    setViewMode() { this.editMode = false; this.itemForm && this.itemForm.disable(); }
    setEditMode() { this.editMode = true; this.itemForm && this.itemForm.enable(); }
    // View/Edit Mode

    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        private _itemService: ItemService,
        private _formBuilder: FormBuilder,
        private _location: Location,
        private _matSnackBar: MatSnackBar
    )
    {
        // Set the default
        this.item = new Item();
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
                    this.item = new Item(item); 
                    console.log('ITEM EDITED:', item, this.item);
                    this.setViewMode(); // hack: add this line if form is using mat-slide-toggle fields
                    this.itemForm = this.createItemForm();
                    this.setViewMode();
                }
                else
                {
                    this.pageType = 'new';
                    this.item = new Item();
                    this.itemForm = this.createItemForm();
                    this.setEditMode();
                }
                
                console.log('FormGroup', this.itemForm);
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

    createItemForm(): FormGroup
    {
        return this._formBuilder.group({
            id: [this.item.id],
            name: [this.item.name],
            description: [this.item.description],
            techDescription: [this.item.techDescription],
            supplier: [this.item.supplier],
            externalId: [this.item.externalId],
            active: [this.item.active],

            recordOnly: [this.item.recordOnly],
            // General
            category: [this.item.category],
            warranty: [this.item.warranty],
            sn: [this.item.sn],
            itemType: [this.item.itemType],
            department: [this.item.department],
            // General properties
            primaryUM: [this.item.primaryUM],
            netWeight: [this.item.netWeight],
            grossWeight: [this.item.grossWeight],
            width: [this.item.width],
            height: [this.item.height],
            depth: [this.item.depth],
            um: [this.item.um],
            // Cost
            suppliersPrice: [this.item.suppliersPrice],
            suppliersDiscount: [this.item.suppliersDiscount],
            transport: [this.item.transport],
            customs: [this.item.customs],
            vat: [this.item.vat],
            // Images
            imageUrl: [this.item.imageUrl],
            // Meta
            createdOn: [this.item.createdOn],
            updatedOn: [this.item.updatedOn],
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
                this._matSnackBar.open('Item saved', 'OK', {
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
                this._matSnackBar.open('Item added', 'OK', {
                    verticalPosition: 'top',
                    duration        : 2000
                });

                // Change the location with new one
                this._location.go('items/' + this.item.id);
            });
    }

    getFormData() {
        let formData = this.itemForm.getRawValue();
        if (!formData.id) formData.id = FuseUtils.generateGUID();
        return formData;
    }

    cancel() {
        this.setViewMode();
        this.itemForm.patchValue(this.latestSavedData);
    }

    edit() {
        this.setEditMode();
    }
}

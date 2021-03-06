import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';

import { Item } from '../user.model';
import {UserService } from '../user.service';

@Component({
    selector     : 'fm-user',
    templateUrl  : './user.component.html',
    styleUrls    : ['./user.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations,

})
export class UserComponent implements OnInit, OnDestroy
{
    item: Item;
    pageType: string;
    itemForm: FormGroup;
    latestSavedData: any;
    hide = true;
    // View/Edit Mode
    editMode: boolean = false;
    setViewMode() { this.editMode = false; this.itemForm && this.itemForm.disable(); }
    setEditMode() { this.editMode = true; this.itemForm && this.itemForm.enable(); }
    // View/Edit Mode

    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        private _itemService: UserService,
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
                    this.setViewMode(); // hack for boolean to be disabled (because of this https://github.com/angular/material2/issues/8022)
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
            id:                 [this.item.id],
            email:              [this.item.email, [Validators.required, Validators.email]],
            password:           [this.item.password],
            firstname:          [this.item.firstname],
            lastname:           [this.item.lastname],
            company:            [this.item.company],
            phone:              [this.item.phone],
            holding_admin:      [this.item.holding_admin],
            role_admin:         [this.item.role_admin],
            role_livestock:     [this.item.role_livestock],
            role_agriculture:   [this.item.role_agriculture],
        });
    }

    save(): void
    {
        const data = this.getFormData();

        this._itemService.saveItem(data)
            .then(() => {

                // Trigger the subscription with new data
                this._itemService.onItemChanged.next(data);

                // Show the success message
                this._matSnackBar.open('User saved', 'OK', {
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
                this._matSnackBar.open('User added', 'OK', {
                    verticalPosition: 'top',
                    duration        : 2000
                });

                // Change the location with new one
                this._location.go('users/' + this.item.id);
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

    getErrorMessage(field) {
        return this.itemForm.get(field).hasError('required') ? 'You must enter a value' :
        this.itemForm.get(field).hasError('email') ? 'Not a valid email' :
                '';
      }
}

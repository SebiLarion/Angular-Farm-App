import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, QueryList, ViewChildren, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { locale as english } from '../i18n/en';
import { locale as romanian } from '../i18n/ro';
import { UserService } from '../user.service';
import { SettingsRegistry } from '../settings.registry';
import { ViewEditForm } from 'app/types/view-edit.interface';

@Component({
    selector   : 'user-settings',
    templateUrl: './user-settings.component.html',
    styleUrls  : ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit, ViewEditForm, AfterViewInit
{

    /* component metadata - used by wrappers/layouts */
    metadata = {
        title: 'User Settings',
        editable: true
    }    

    form: FormGroup;
    userDetails: any;
    latestSavedData: any;
    companies: any[];
    editMode: boolean = false;



    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} 
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _formBuilder: FormBuilder,
        private _user: UserService,
        private settingsRegistry: SettingsRegistry
    )
    {
        this._fuseTranslationLoaderService.loadTranslations(english, romanian);

        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        // Subscribe to user data
        this._user.onUserDetailsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(companies => {
                this.companies = companies;
                this.userDetails = companies[0]; // find by id and service method getUserById or byLoggedInUser
                this.form = this.createEditForm();



                // update on real time?
                this.form.valueChanges
                .pipe(
                    takeUntil(this._unsubscribeAll),
                    debounceTime(500), distinctUntilChanged()
                )
                .subscribe(data => {
                    console.log('Data changed: ', data);
                    // this._user.updateUser(data);
                });

        });

        // view/edit mode
        this.setViewMode();
        // let the wrapper layout know this is en editable component (to display edit/save/cancel buttons)
        this.settingsRegistry.setEditable(true);

        // keep latest data (we need to reset data)
        this.latestSavedData = this.getFormData();
    }

    ngAfterViewInit() {
                // register the form
        // this.settingsRegistry.registerOrUpdate('form', this.form);
        this.settingsRegistry.registerOrUpdate('editor', this);
    }

    save() {

        console.log('getRawValue (parent): ', this.form.getRawValue());

        let formData = this.getFormData();
        this._user.updateUser( formData );

        // this line will run after data is saved on server 
        // if data is not saved on server this.latestSavedData will remain untouched
        this.latestSavedData = formData;

        setTimeout(()=>{ this.setViewMode() }, 0);
    }

    cancel() {
        this.setViewMode();
        this.form.patchValue(this.latestSavedData);
    }

    edit() {
        this.setEditMode();
    }

        /**
     * Create edit form
     *
     * @returns {FormGroup}
     */
    createEditForm(): FormGroup
    {
        return this._formBuilder.group({
            name:       [this.userDetails.name, Validators.required],
            email:      [this.userDetails.email, Validators.email],
            password:   [this.userDetails.password, Validators.email],
            firsname:   [this.userDetails.firstname, Validators.required],
            lastname:   [this.userDetails.lastname, Validators.required],
            company:    [this.userDetails.company, Validators.required],
            phone:      [this.userDetails.phone, Validators.required],
            role_admin:     [this.userDetails.holding_admin, Validators.required],
            holding_admin:     [this.userDetails.holding_admin, Validators.required],
            role_livestock:     [this.userDetails.role_livestock, Validators.required],
            role_agriculture:     [this.userDetails.role_agriculture, Validators.required]
        });
    }

    getFormData() {
        let formData = this.form.getRawValue();
        formData.id = '1549371822749';
        return formData;
    }

    setViewMode() {
        this.editMode = false;
        this.form.disable();
    }

    setEditMode() {
        this.editMode = true;
        this.form.enable();
    }

    ngOnDestroy(): void
    {

        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();

        // this.settingsRegistry.unregister('form');
        // this.settingsRegistry.unregister('editor');
    }
}

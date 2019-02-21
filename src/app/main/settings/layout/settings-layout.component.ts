import { Component, OnDestroy, OnInit, ViewEncapsulation, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { SettingsRegistry } from '../settings.registry';
import { ViewEditForm } from 'app/types/view-edit.interface';
import { Router, NavigationStart } from '@angular/router';

@Component({
    selector     : 'settings-layout',
    templateUrl  : './settings-layout.component.html',
    styleUrls    : ['./settings-layout.component.scss'],
    // changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class SettingsLayoutComponent implements OnInit, OnDestroy
{
    isIndeterminate: boolean;

    editable: boolean = false;
    editMode: boolean = false;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {TodoService} _todoService
     */
    constructor(
        private _fuseSidebarService: FuseSidebarService,
        public settingsRegistry: SettingsRegistry,
        private router: Router,
        private cd: ChangeDetectorRef
    )
    {
        router.events.forEach((event) => {
            if(event instanceof NavigationStart) {
                // when leaving a component in edit mode 
                // (probably we should ask to save data and prevent routing)
                this.editMode = false;
            }
          });
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.cd.detectChanges();
        this.settingsRegistry.editable.subscribe( (editable) => {
            setTimeout( () => { this.editable = editable; }, 0 )
        } )
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle the sidebar
     *
     * @param name
     */
    toggleSidebar(name): void
    {
        this._fuseSidebarService.getSidebar(name).toggleOpen();
    }


    save() {

        console.log(this.settingsRegistry.getValue('editor'))
        let editor: ViewEditForm = this.settingsRegistry.getValue('editor');
        if (editor && typeof editor.save === 'function') editor.save();

        // console.log('getRawValue: ', this.form.getRawValue());

        
        // this._company.updateCompany( formData );

        // // this line will run after data is saved on server 
        // // if data is not saved on server this.latestSavedData will remain untouched
        // let formData = this.getFormData(editor);
        editor.latestSavedData = this.getFormData(editor);

        setTimeout(()=>{ this.setViewMode() }, 0);
    }

    cancel() {
        this.setViewMode();
        let editor: ViewEditForm = this.settingsRegistry.getValue('editor');
        if (editor && editor.form) editor.form.patchValue(editor.latestSavedData);
        // this.form.patchValue(this.latestSavedData);
    }

    edit() {
        this.setEditMode();
    }


    setViewMode() {
        this.editMode = false;
        let editor: ViewEditForm = this.settingsRegistry.getValue('editor');
        if (editor && editor.form) editor.form.disable();
    }
    
    setEditMode() {
        this.editMode = true;
        let editor: ViewEditForm = this.settingsRegistry.getValue('editor');
        if (editor && editor.form) editor.form.enable();
    }

    getFormData(editor: ViewEditForm) {
        let formData;

        if (!editor) editor = this.settingsRegistry.getValue('editor');
        if (editor && editor.form) {
            formData = editor.form.getRawValue();
            formData.id = '1549371822749';
        }
        
        return formData;
    }
}

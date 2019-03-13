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
    selector     : 'settings-list-layout',
    templateUrl  : './settings-list-layout.component.html',
    styleUrls    : ['./settings-list-layout.component.scss'],
    // changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class SettingsListLayoutComponent implements OnInit, OnDestroy
{
    isIndeterminate: boolean;

    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        private _fuseSidebarService: FuseSidebarService,
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void
    {
    }

    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    toggleSidebar(name): void
    {
        this._fuseSidebarService.getSidebar(name).toggleOpen();
    }

}

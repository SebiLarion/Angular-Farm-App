import { Component } from '@angular/core';

import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { locale as english } from '../i18n/en';
import { locale as romanian } from '../i18n/ro';
import { SettingsRegistry } from '../settings.registry';

@Component({
    selector   : 'holding-settings',
    templateUrl: './holding-settings.component.html',
    styleUrls  : ['./holding-settings.component.scss']
})
export class HoldingSettingsComponent
{
    /* component metadata - used by wrappers/layouts */
    metadata = {
        title: 'Holding Settings',
        editable: true
    }


    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */
    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private settingsRegistry: SettingsRegistry
    )
    {
        this._fuseTranslationLoaderService.loadTranslations(english, romanian);
    }

    ngOnInit() {
        this.settingsRegistry.registerOrUpdate('editor', this);
        this.settingsRegistry.setEditable(true);
    }

    ngAfterViewInit() {
        // register the form
        // this.settingsRegistry.registerOrUpdate('form', this.form);
        // this.settingsRegistry.registerOrUpdate('editor', this);
    }

    ngOnDestroy(): void
    {
        // this.settingsRegistry.unregister('editor');
    }
}

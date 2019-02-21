import { Component } from '@angular/core';

import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { locale as english } from '../i18n/en';
import { locale as romanian } from '../i18n/ro';
import { SettingsRegistry } from '../settings.registry';

@Component({
    selector   : 'settings-roles',
    templateUrl: './roles.component.html',
    styleUrls  : ['./roles.component.scss']
})
export class RolesComponent
{
    /* component metadata - used by wrappers/layouts */
    metadata = {
      title: 'Roles',
      editable: false
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
      this.settingsRegistry.setEditable(false);
    }

    ngOnDestroy(): void
    {
        this.settingsRegistry.unregister('editor');
    }
}

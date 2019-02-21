import { Component } from '@angular/core';

import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { locale as english } from '../i18n/en';
import { locale as romanian } from '../i18n/ro';

@Component({
    selector   : 'machinery-settings',
    templateUrl: './machinery-settings.component.html',
    styleUrls  : ['./machinery-settings.component.scss']
})
export class MachinerySettingsComponent
{
    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */
    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService
    )
    {
        this._fuseTranslationLoaderService.loadTranslations(english, romanian);
    }
}

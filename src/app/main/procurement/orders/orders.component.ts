import { Component } from '@angular/core';

import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { locale as english } from '../i18n/en';
import { locale as romanian } from '../i18n/ro';

@Component({
    selector   : 'orders',
    templateUrl: './orders.component.html',
    styleUrls  : ['./orders.component.scss']
})
export class OrdersComponent
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

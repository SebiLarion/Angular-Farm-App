import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { ItemsSettingsComponent } from './items-settings/items-settings.component';

const routes = [
    {
        path     : 'items-settings',
        component: ItemsSettingsComponent
    }
];

@NgModule({
    declarations: [
        ItemsSettingsComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        TranslateModule,

        FuseSharedModule
    ],
    exports     : [
        ItemsSettingsComponent
    ]
})

export class ItemsModule
{
}

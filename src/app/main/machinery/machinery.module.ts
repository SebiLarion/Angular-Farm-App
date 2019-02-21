import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { MachinerySettingsComponent } from './machinery-settings/machinery-settings.component';

const routes = [
    {
        path     : 'machinery-settings',
        component: MachinerySettingsComponent
    }
];

@NgModule({
    declarations: [
        MachinerySettingsComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        TranslateModule,

        FuseSharedModule
    ],
    exports     : [
        MachinerySettingsComponent
    ]
})

export class MachineryModule
{
}

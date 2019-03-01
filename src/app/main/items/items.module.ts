import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { ItemsSettingsComponent } from './items-settings/items-settings.component';
import { ItemsListComponent } from './items-list/items-list.component';
import { ItemsService } from './items-list/items.service';
import { MaterialComponentsModule } from 'app/shared/material-components/material-components.module';
import { ItemService } from './item.service';
import { ItemComponent } from './item/item.component';

const routes = [
    {
        path     : 'items-settings',
        component: ItemsSettingsComponent
    },
    {
        path     : 'items',
        component: ItemsListComponent,
        resolve  : {
            data: ItemsService
        }
    },
    {
        path     : 'items/:id',
        component: ItemComponent,
        resolve  : {
            data: ItemService
        }
    }
];

@NgModule({
    declarations: [
        ItemsSettingsComponent,
        ItemsListComponent,
        ItemComponent
    ],
    providers: [
        ItemsService,
        ItemService
    ],
    imports     : [
        RouterModule.forChild(routes),
        TranslateModule,
        FuseSharedModule,
        MaterialComponentsModule
    ],
    exports     : [
        ItemsSettingsComponent,
        ItemComponent
    ]
})

export class ItemsModule
{
}

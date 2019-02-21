import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { InventoriesComponent } from './inventories/inventories.component';
import { ReceivingComponent } from './receiving/receiving.component';
import { StocksComponent } from './stocks/stocks.component';

const routes = [
    {
        path     : 'inventories',
        component: InventoriesComponent
    },
    {
        path     : 'receiving',
        component: ReceivingComponent
    },
    {
        path     : 'stocks',
        component: StocksComponent
    }
];

@NgModule({
    declarations: [
        InventoriesComponent,
        ReceivingComponent,
        StocksComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        TranslateModule,

        FuseSharedModule
    ],
    exports     : [
        InventoriesComponent,
        ReceivingComponent,
        StocksComponent
    ]
})

export class InventoryModule
{
}

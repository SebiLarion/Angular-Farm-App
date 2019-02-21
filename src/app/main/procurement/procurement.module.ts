import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { OrdersComponent } from './orders/orders.component';
import { AddOrderComponent } from './add-order/add-order.component';

const routes = [
    {
        path     : 'procurement-orders',
        component: OrdersComponent
    },
    {
        path     : 'add-order',
        component: AddOrderComponent
    }
];

@NgModule({
    declarations: [
        OrdersComponent,
        AddOrderComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        TranslateModule,

        FuseSharedModule
    ],
    exports     : [
        OrdersComponent,
        AddOrderComponent
    ]
})

export class ProcurementModule
{
}

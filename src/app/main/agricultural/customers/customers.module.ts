import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';
import { MaterialComponentsModule } from 'app/shared/material-components/material-components.module';

import { CustomerService } from './customer.service';
import { CustomersService } from './customers.service';
import { CustomersListComponent } from './customer-list/customers-list.component';
import { CustomerComponent } from './customer/customer.component';


const routes = [
    {
        path     : 'customers',
        component: CustomersListComponent,
        resolve  : {
            data: CustomersService
        }
    },
    {
        path     : 'customers/:id',
        component: CustomerComponent,
        resolve  : {
            data: CustomerService
        }
    }

];

@NgModule({
    declarations: [
        CustomersListComponent,
        CustomerComponent
    ],
    providers: [
        CustomersService,
        CustomerService
    ],
    imports: [
        RouterModule.forChild(routes),
        TranslateModule,
        FuseSharedModule,
        MaterialComponentsModule
    ],
    exports: [
        CustomersListComponent,
        CustomerComponent
    ]
})

export class CustomersModule
{
}

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { MaterialComponentsModule } from 'app/shared/material-components/material-components.module';
import { FuseSidebarModule } from '@fuse/components';

import { AgriculturalListLayoutComponent } from './layout/agricultural-list-layout.component';
import { AgriculturalSidebarComponent } from './layout/agricultural-sidebar/agricultural-sidebar.component';
import { AgriculturalRegistry } from './agricultural.registry';

// Suppliers
import { SuppliersModule } from './suppliers/suppliers.module';
import { SuppliersListComponent } from './suppliers/supplier-list/suppliers-list.component';
import { SuppliersService } from './suppliers/suppliers.service';
import { SupplierComponent } from './suppliers/supplier/supplier.component';
import { SupplierService } from './suppliers/supplier.service';


//Customers
import { CustomersModule } from './customers/customers.module';
import { CustomersService } from './customers/customers.service';
import { CustomerService } from './customers/customer.service';
import { CustomersListComponent } from './customers/customer-list/customers-list.component';
import { CustomerComponent } from './customers/customer/customer.component';

const routes = [
    {
        path: '',
        component: AgriculturalListLayoutComponent,
        children: [
            {
                path     : 'suppliers',
                component: SuppliersListComponent,
                resolve  : {
                    // data: SuppliersService
                }
            },
            {
                path     : 'suppliers/:id',
                component: SupplierComponent,
                resolve  : {
                    // data: SupplierService
                }
            },
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
        ]
    },
    
];

@NgModule({
    declarations: [
        AgriculturalListLayoutComponent,
        AgriculturalSidebarComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        FuseSidebarModule,
        TranslateModule,

        FuseSharedModule,
        MaterialComponentsModule,
        
        SuppliersModule, CustomersModule
    ],
    providers   : [
        AgriculturalRegistry
    ],
    exports     : [
    ]
})

export class AgriculturalModule
{
}

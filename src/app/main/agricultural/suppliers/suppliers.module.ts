import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';
import { MaterialComponentsModule } from 'app/shared/material-components/material-components.module';

import { SupplierService } from './supplier.service';
import { SuppliersService } from './suppliers.service';
import { SuppliersListComponent } from './supplier-list/suppliers-list.component';
import { SupplierComponent } from './supplier/supplier.component';


const routes = [

];

@NgModule({
    declarations: [
        SuppliersListComponent,
        SupplierComponent
    ],
    providers: [
        SuppliersService,
        SupplierService
    ],
    imports: [
        // RouterModule.forChild(routes),
        TranslateModule,
        FuseSharedModule,
        MaterialComponentsModule
    ],
    exports: [
        SuppliersListComponent,
        SupplierComponent
    ]
})

export class SuppliersModule
{
}

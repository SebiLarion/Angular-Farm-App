import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';
import { MaterialComponentsModule } from 'app/shared/material-components/material-components.module';

import { UnitsListComponent } from './units-list/units-list.component';
import { UnitsService } from './units.service';
import { UnitService } from './unit.service';
import { UnitComponent } from './unit/unit.component';

const routes = [
    {
        path     : 'units',
        component: UnitsListComponent,
        resolve  : {
            data: UnitsService
        }
    },
    {
        path     : 'units/:id',
        component: UnitComponent,
        resolve  : {
            data: UnitService
        }
    }
];

@NgModule({
    declarations: [
        UnitsListComponent,
        UnitComponent
    ],
    providers: [
        UnitsService,
        UnitService
    ],
    imports     : [
        RouterModule.forChild(routes),
        TranslateModule,
        FuseSharedModule,
        MaterialComponentsModule
    ],
    exports     : [
        UnitsListComponent,
        UnitComponent
    ]
})

export class UnitsModule
{
}

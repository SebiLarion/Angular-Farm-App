import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatStepperModule, MatCheckboxModule, MatMenuModule, MatTooltipModule, MatDatepickerModule, MatRippleModule } from '@angular/material';

import { MaterialComponentsModule } from 'app/shared/material-components/material-components.module';
import { FuseSharedModule } from '@fuse/shared.module';

const routes = [
    {
        path: 'agricultural',
        loadChildren: './agricultural.module#AgriculturalModule',
    },
];
@NgModule({
    imports: [
        RouterModule.forRoot(routes),
        MaterialComponentsModule
    ],
    declarations: [
    ],
    providers   : [
    ],
    exports: [
    ]
})
export class AgriculturalRouting
{
}

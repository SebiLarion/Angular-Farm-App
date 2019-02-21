import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatStepperModule, MatCheckboxModule, MatMenuModule, MatTooltipModule, MatDatepickerModule, MatRippleModule } from '@angular/material';


import { CompanySettingsComponent } from './company-settings/company-settings.component';
import { HoldingSettingsComponent } from './holding-settings/holding-settings.component';
import { CompanyService } from './company.service';
import { SettingsSidebarComponent } from './layout/settings-sidebar/settings-sidebar.component';
import { SettingsLayoutComponent } from './layout/settings-layout.component';
import { FuseSidebarModule } from '@fuse/components';
import { SettingsRegistry } from './settings.registry';
import { UsersComponent } from './users/users.component';
import { RolesComponent } from './roles/roles.component';

const routes = [
{
        path: '',
        component: SettingsLayoutComponent,
        resolve: {
            company: CompanyService
        },
        // children: [
        children: [
            {
                path: '',
                redirectTo: 'company',
                pathMatch: 'full'
            },
            {
                path: 'company',
                component: CompanySettingsComponent,
                resolve: {
                    company: CompanyService
                }
            },
            {
                path: 'holding',
                component: HoldingSettingsComponent
            },
            {
                path: 'users',
                component: UsersComponent
            },
            {
                path: 'roles',
                component: RolesComponent
            }
        ]
    }
    // {
    //     path: 'company-settings',
    //     component: CompanySettingsComponent,
    //     resolve: {
    //         company: CompanyService
    //     }
    // },
    // {
    //     path     : 'holding-settings',
    //     component: HoldingSettingsComponent
    // }
];

@NgModule({
    declarations: [
        CompanySettingsComponent,
        HoldingSettingsComponent,
        SettingsSidebarComponent,
        SettingsLayoutComponent,
        UsersComponent,
        RolesComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        FuseSidebarModule,
        TranslateModule,


        FuseSharedModule,

        MatIconModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatStepperModule,
        MatCheckboxModule,
        MatMenuModule,
        
        MatTooltipModule,
        MatDatepickerModule,
        MatRippleModule,
    ],
    providers   : [
        CompanyService,
        SettingsRegistry
    ],
    exports     : [
        CompanySettingsComponent,
        HoldingSettingsComponent
    ]
})

export class SettingsModule
{
}

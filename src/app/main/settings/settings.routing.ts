import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatStepperModule, MatCheckboxModule, MatMenuModule, MatTooltipModule, MatDatepickerModule, MatRippleModule } from '@angular/material';

// import { HoldingSettingsComponent } from './holding-settings/holding-settings.component';
import { CompanyService } from './company.service';
import { SettingsRegistry } from './settings.registry';
import { SettingsSidebarComponent } from './layout/settings-sidebar/settings-sidebar.component';
// import { CompanySettingsComponent } from './company-settings/company-settings.component';
// import { RolesComponent } from './roles/roles.component';
// import { UsersComponent } from './users/users.component';
// import { SettingsLayoutComponent } from './layout/settings-layout.component';

const routes = [
    {
        path: 'settings',
        // component: SettingsLayoutComponent,
        loadChildren: './settings.module#SettingsModule',
        // resolve: {
        //     company: CompanyService
        // },
        // children: [
        //     {
        //         path: '',
        //         redirectTo: 'company',
        //         pathMatch: 'full'
        //     },
        //     {
        //         path: 'company',
        //         component: CompanySettingsComponent,
        //         resolve: {
        //             company: CompanyService
        //         }
        //     },
        //     {
        //         path: 'holding',
        //         component: HoldingSettingsComponent
        //     },
        //     {
        //         path: 'users',
        //         component: UsersComponent
        //     },
        //     {
        //         path: 'roles',
        //         component: RolesComponent
        //     }
        // ]
    },
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
    imports: [
        RouterModule.forRoot(routes),

        MatButtonModule,
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
    declarations: [
        // SettingsSidebarComponent
    ],
    providers   : [
        CompanyService,
        SettingsRegistry
    ],
    exports: [
        // SettingsSidebarComponent,
         
        MatButtonModule,
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
    ]
})
export class SettingsRouting
{
}

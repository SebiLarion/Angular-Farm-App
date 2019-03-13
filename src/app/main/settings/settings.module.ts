import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { MaterialComponentsModule } from 'app/shared/material-components/material-components.module';
import { FuseSidebarModule } from '@fuse/components';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatStepperModule, MatCheckboxModule, MatMenuModule, MatTooltipModule, MatDatepickerModule, MatRippleModule } from '@angular/material';



import { SettingsSidebarComponent } from './layout/settings-sidebar/settings-sidebar.component';
import { SettingsLayoutComponent } from './layout/settings-layout.component';
import { SettingsRegistry } from './settings.registry';

import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';
import { UserService } from './users/user.service';
import { UsersListComponent } from './users/users-list/users-list.component';
import { UserComponent } from './users/user/user.component';

import { SettingsListLayoutComponent } from './layout/settings-list-layout.component';

const routes = [
    {
        path: 'list',
        component: SettingsListLayoutComponent,
        // children: [
        children: [
            {
                path     : 'users',
                component: UsersListComponent,
                resolve  : {
                    data: UsersService
                }
            },
            {
                path     : 'users/:id',
                component: UserComponent,
                resolve  : {
                    data: UserService
                }
            }
        ]
    },
    
];

@NgModule({
    declarations: [
        SettingsLayoutComponent, 
        SettingsListLayoutComponent,
        SettingsSidebarComponent,
    ],
    imports     : [
        RouterModule.forChild(routes),
        FuseSidebarModule,
        TranslateModule,

        FuseSharedModule,
        MaterialComponentsModule,

        UsersModule,
    ],
    providers   : [
        SettingsRegistry,
    ],
    exports     : [
    ]
})

export class SettingsModule
{
}

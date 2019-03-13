import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { MaterialComponentsModule } from 'app/shared/material-components/material-components.module';
import { UsersService } from './users.service';
import { UsersListComponent } from './users-list/users-list.component';
import { UserComponent } from './user/user.component';
import { UserService } from './user.service';

const routes = [
    // {
    //     path     : 'users',
    //     component: UsersListComponent,
    //     resolve  : {
    //         data: UsersService
    //     }
    // },
    // {
    //     path     : 'users/:id',
    //     component: UserComponent,
    //     resolve  : {
    //         data: UserService
    //     }
    // }
];

@NgModule({
    declarations: [
        UsersListComponent,
        UserComponent
    ],
    providers: [
        UsersService,
        UserService
    ],
    imports: [
        RouterModule.forChild(routes),
        TranslateModule,
        FuseSharedModule,
        MaterialComponentsModule
    ],
    exports: [
        UsersListComponent,
        UserComponent,
    ]
})

export class UsersModule
{
}

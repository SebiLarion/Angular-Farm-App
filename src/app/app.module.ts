import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatStepperModule, MatCheckboxModule, MatMenuModule, MatTooltipModule, MatDatepickerModule, MatRippleModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { SampleModule } from 'app/main/sample/sample.module';
// import { SettingsModule } from 'app/main/settings/settings.module';
import { ItemsModule } from 'app/main/items/items.module';
import { MachineryModule } from './main/machinery/machinery.module';
import { InventoryModule } from './main/inventory/inventory.module';
import { ProcurementModule } from './main/procurement/procurement.module';
import { FakeDbService } from 'app/fake-data/fake-data.service';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { StartComponent } from './main/start/start.component';
import { SettingsRouting } from './main/settings/settings.routing';

const appRoutes: Routes = [
    {
        path      : '**',
        redirectTo: 'start'
    },
    {
        path: 'start',
        component: StartComponent
    }
];

@NgModule({
    declarations: [
        AppComponent,
        StartComponent,
    ],
    imports     : [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),
        SettingsRouting,

        InMemoryWebApiModule.forRoot(FakeDbService, {
            delay             : 0,
            passThruUnknownUrl: true
        }),

        TranslateModule.forRoot(),

        // Material moment date module
        MatMomentDateModule,

        // Material
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

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // App modules
        LayoutModule,
        SampleModule,
        // SettingsModule,
        ItemsModule,
        MachineryModule,
        InventoryModule,
        ProcurementModule
    ],
    bootstrap   : [
        AppComponent
    ],
    exports: [
        RouterModule,
        
    ]
})
export class AppModule
{
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { AdminLayoutComponent } from './layout/admin-layout.component';
import { FranchiseSalesService } from './services/franchiseSales.service';
import { GoogleMapService } from '@app/shared/services/google-map.service';
import { environment } from 'environments/environment';
import { UserAuthService } from '../auth/services/auth.service';
import { FranchisesService } from './services/franchises.service';
import { NgxEchartsModule } from 'ngx-echarts';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { SliderImageComponent } from './pages/slider-image/slider-image.component';
import { AdminAuthService } from './services/admin-auth.service';
import { BuisnessService } from './services/buisness.service';
import { AddBuisnessDialogComponent } from './components/add-buisness-dialog/add-buisness-dialog.component';
import { NewProjectPageComponent } from './pages/new-project-page/new-project-page.component';


@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyB-EsaismaaJDTBDg0F2l-28Z-7zsVCTWU ",
      libraries: ["places"]
    }),
    InfiniteScrollModule,
    NgxEchartsModule
  ],
  providers: [
    AdminAuthService,
    BuisnessService,
    FranchiseSalesService,
    GoogleMapService,
    UserAuthService,
    FranchisesService,
  ],
  declarations: [ 
    AdminLayoutComponent,
    DashboardComponent,
    ProjectsComponent,
    UserDetailsComponent,
    SliderImageComponent,
    AddBuisnessDialogComponent,
    NewProjectPageComponent
  ],
})
export class AdminModule { }

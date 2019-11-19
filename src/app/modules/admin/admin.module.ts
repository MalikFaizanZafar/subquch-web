import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { AdminLayoutComponent } from './layout/admin-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { SliderImageComponent } from './pages/slider-image/slider-image.component';
import { AdminAuthService } from './services/admin-auth.service';
import { BuisnessService } from './services/buisness.service';
import { NewProjectPageComponent } from './pages/new-project-page/new-project-page.component';
import { ProjectDetailsPageComponent } from './pages/project-details-page/project-details-page.component';
import { EditProjectPageComponent } from './pages/edit-project-page/edit-project-page.component';


@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ],
  providers: [
    AdminAuthService,
    BuisnessService
  ],
  declarations: [ 
    AdminLayoutComponent,
    DashboardComponent,
    ProjectsComponent,
    UserDetailsComponent,
    SliderImageComponent,
    NewProjectPageComponent,
    ProjectDetailsPageComponent,
    EditProjectPageComponent
  ],
})
export class AdminModule { }

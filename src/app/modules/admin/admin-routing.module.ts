import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { AdminLayoutComponent } from './layout/admin-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { SliderImageComponent } from './pages/slider-image/slider-image.component';
import { NewProjectPageComponent } from './pages/new-project-page/new-project-page.component';

const routes: Routes = [
  { path: '', component: AdminLayoutComponent, children: [
    // { path: 'vendors', component: VendorsComponent},
    { path: 'dashboard', component: DashboardComponent},
    { path: 'projects', component: ProjectsComponent},
    { path: 'projects/new', component: NewProjectPageComponent},
    { path: 'user-details', component: UserDetailsComponent},
    { path: 'slider-image', component: SliderImageComponent},
    // { path: 'sales', component: SalesComponent},
    // { path: 'advertisements', component: AdvertisementComponent},
    // { path: 'settings', component: SettingsComponent},
    // { path: 'stats', component: StatsComponent},
    // { path: '*', component: VendorsComponent}
  ]}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

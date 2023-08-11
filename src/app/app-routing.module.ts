import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  addEmployeeFormPath,
  dashboardPath,
  editEmployeeFormPath,
  employeeFormPath,
  employeeManagerPath,
  fallbackRoutePath,
  noPath,
} from './core/constants/routes';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

// TODO: [{ path..., component..., children: [ {path..., loadChildren ...}, {path....}]
const routes: Routes = [
  { path: noPath, redirectTo: dashboardPath, pathMatch: 'full' },
  {
    path: employeeManagerPath,
    loadChildren: () =>
      import('./feature-modules/employee-manager/employee-manager.module').then(
        m => m.EmployeeManagerModule
      ),
  },
  // TODO: ask - should we have lazy loading everywhere or not -e.g. below - default page - but if somebody starts from different one -e.g. using some shared link - we may not need to load it
  {
    path: dashboardPath,
    loadChildren: () =>
      import('./feature-modules/dashboard/dashboard.module').then(
        m => m.DashboardModule
      ),
  },
  {
    path: employeeFormPath,
    children: [
      {
        path: addEmployeeFormPath,
        loadChildren: () =>
          import('./feature-modules/employee-form/employee-form.module').then(
            m => m.EmployeeFormModule
          ),
      },
      {
        path: editEmployeeFormPath,
        loadChildren: () =>
          import('./feature-modules/employee-form/employee-form.module').then(
            m => m.EmployeeFormModule
          ),
      },
    ],
  },
  {
    path: fallbackRoutePath,
    pathMatch: 'full',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

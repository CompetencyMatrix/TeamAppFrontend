import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'employees',
    loadChildren: () =>
      import('./employee-list/employee-list.module').then(
        m => m.EmployeeListModule
      ),
  },
  // TODO: ask - should we have lazy loading everywhere or not -e.g. below - default page - but if somebody starts from different one -e.g. using some shared link - we may not need to load it
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./company-dashboard/company-dashboard.module').then(
        m => m.CompanyDashboardModule
      ),
  },
  {
    path: 'employee/:id',
    loadChildren: () =>
      import('./employee-form/employee-form.module').then(
        m => m.EmployeeFormModule
      ),
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  //   TODO: ** PageNotFoundComponent
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

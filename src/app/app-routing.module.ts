import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//TODO: do stalej
// TODO: fall back path **
// TODO: [{ path..., component..., children: [ {path..., loadChildren ...}, {path....}]
const routes: Routes = [
  {
    path: 'employees',
    loadChildren: () =>
      import('./feature-modules/employee-table/employee-table.module').then(
        m => m.EmployeeTableModule
      ),
  },
  // TODO: ask - should we have lazy loading everywhere or not -e.g. below - default page - but if somebody starts from different one -e.g. using some shared link - we may not need to load it
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./feature-modules/dashboard/dashboard.module').then(
        m => m.DashboardModule
      ),
  },
  {
    path: 'employee/:id',
    loadChildren: () =>
      import('./feature-modules/employee-form/employee-form.module').then(
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

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { appRoutesNames } from '../../core/constants/appRoutesNames';
import { PageNotFoundComponent } from '../../core/components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: appRoutesNames.DASHBOARD,
    pathMatch: 'full',
  },
  {
    path: appRoutesNames.EMPLOYEE_MANAGER,
    loadChildren: () =>
      import('../employee-manager/employee-manager.module').then(
        m => m.EmployeeManagerModule
      ),
  },
  {
    path: appRoutesNames.DASHBOARD,
    loadChildren: () =>
      import('../dashboard/dashboard.module').then(m => m.DashboardModule),
  },
  {
    // TODO: sprawdz jak sie zachowa teraz
    path: appRoutesNames.EMPLOYEE_FORM,
    loadChildren: () =>
      import('../employee-form/employee-form.module').then(
        m => m.EmployeeFormModule
      ),
  },
  {
    path: '**',
    pathMatch: 'full',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewManagerRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeManagerComponent } from './features/employee/employee-manager/employee-manager.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { EmployeeFormComponent } from './features/employee/employee-form/employee-form.component';

const routes: Routes = [
  { path: 'employees', component: EmployeeManagerComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'employee/:id', component: EmployeeFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

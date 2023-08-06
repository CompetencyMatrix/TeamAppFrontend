import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeManagerComponent } from './features/employee/employee-manager/employee-manager.component';

const routes: Routes = [
  { path: 'employees', component: EmployeeManagerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

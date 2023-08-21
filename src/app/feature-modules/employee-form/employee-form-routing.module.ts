import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeFormComponent } from './employee-form.component';
import { appRoutesNames } from '../../../config/appRoutesNames';

const routes: Routes = [
  {
    path: '',
    component: EmployeeFormComponent,
  },
];
// TODO: w navbarze niech bedzie zaznaczone na ktorej stronie jestesmy

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeFormRoutingModule {}

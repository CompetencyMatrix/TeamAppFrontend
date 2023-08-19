import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
// TODO: when there is a reason to use such structure?: [{ path..., component..., children: [ {path..., loadChildren ...}, {path....}]
const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./feature-modules/view-manager/view-manager.module').then(
        m => m.ViewManagerModule
      ),
  },
  {
    path: '**',
    pathMatch: 'full',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

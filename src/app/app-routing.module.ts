import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./login.module').then(m => m.LoginModule) }, // Ленивый модуль
  { path: 'tasks', loadChildren: () => import('./task.module').then(m => m.TaskModule) }, // Ленивый модуль
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



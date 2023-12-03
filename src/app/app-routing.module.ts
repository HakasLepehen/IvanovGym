import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { MainComponent } from './pages/main/main.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: AuthComponent,
  },
  {
    path: 'signup',
    component: AuthComponent,
  },
  {
    path: 'clients',
    loadChildren: () => import('./modules/clients/clients.module').then((_) => _.ClientsModule),
  },
  {
    path: 'scheduler',
    loadChildren: () => import('./modules/scheduler/scheduler.module').then((_) => _.SchedulerModule),
  },
  {
    path: 'users-management',
    loadChildren: () => import('./modules/users-management/users-management.module').then(_ => _.UsersManagementModule)
  },
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '404',
    component: NotFoundComponent,
  },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

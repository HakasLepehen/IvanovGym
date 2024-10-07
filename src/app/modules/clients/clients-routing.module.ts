import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from '../../pages/clients/clients.component';
import { NgModule } from '@angular/core';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ClientsComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }

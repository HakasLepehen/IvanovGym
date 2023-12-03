import { NgModule } from '@angular/core';
import { UsersManagementRoutingModule } from '../users-management-routing/users-management-routing.module';
import { TaigaModule } from '../taiga/taiga.module';

@NgModule({
  declarations: [],
  imports: [
    UsersManagementRoutingModule,
    TaigaModule
  ]
})
export class UsersManagementModule { }

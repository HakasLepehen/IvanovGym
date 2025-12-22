import { NgModule } from '@angular/core';
import { UsersManagementRoutingModule } from '../users-management-routing/users-management-routing.module';
import { TaigaModule } from '../taiga/taiga.module';
import { UsersManagementComponent } from '../../components/users-management/users-management.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [UsersManagementComponent],
  imports: [UsersManagementRoutingModule, TaigaModule, ReactiveFormsModule],
})
export class UsersManagementModule {}

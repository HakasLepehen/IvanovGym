import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsComponent } from '../../components/clients/clients.component';
import { TaigaModule } from '../taiga/taiga.module';
import { LoaderComponent } from '../../components/loader/loader.component';
import { ClientOperationsComponent } from '../../components/client-operations/client-operations.component';

@NgModule({
  imports: [
    CommonModule,
    ClientsRoutingModule,
    TaigaModule,
    ClientOperationsComponent,
  ],
  exports: [],
  declarations: [
    ClientsComponent,
    LoaderComponent,
  ],
})
export class ClientsModule { }

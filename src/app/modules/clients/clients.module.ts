import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsComponent } from '../../components/clients/clients.component';
import { TaigaModule } from '../taiga/taiga.module';
import { LoaderComponent } from '../../components/loader/loader.component';
import { ClientOperationsComponent } from '../../components/client-operations/client-operations.component';
import { LoaderModule } from 'src/app/components/loader/loader/loader.module';

@NgModule({
  imports: [
    CommonModule,
    ClientsRoutingModule,
    TaigaModule,
    ClientOperationsComponent,
    AsyncPipe,
    LoaderModule
  ],
  exports: [],
  declarations: [
    ClientsComponent,
  ],
})
export class ClientsModule { }

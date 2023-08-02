import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsComponent } from '../../components/clients/clients.component';
import { TuiAccordionModule } from '@taiga-ui/kit';

@NgModule({
  imports: [
    CommonModule,
    ClientsRoutingModule,
    TuiAccordionModule
  ],
  declarations: [ClientsComponent],
})
export class ClientsModule { }

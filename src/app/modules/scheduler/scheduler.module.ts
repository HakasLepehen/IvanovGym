import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaigaModule } from '../taiga/taiga.module';
import { SchedulerRoutingModule } from './scheduler-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SchedulerRoutingModule,
    TaigaModule
  ]
})
export class SchedulerModule { }

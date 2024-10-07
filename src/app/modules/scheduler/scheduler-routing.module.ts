import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchedulerComponent } from 'src/app/pages/scheduler/scheduler.component';

const routes: Routes = [
  {
    path: '',
    component: SchedulerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchedulerRoutingModule {}

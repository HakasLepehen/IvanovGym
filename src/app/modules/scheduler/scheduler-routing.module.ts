import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainingComponent } from 'src/app/components/training/training.component';
import { SchedulerComponent } from 'src/app/pages/scheduler/scheduler.component';

const routes: Routes = [
  {
    path: '',
    component: SchedulerComponent,
    pathMatch: 'full',
  },
  {
    path: 'training/:id',
    component: TrainingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchedulerRoutingModule { }

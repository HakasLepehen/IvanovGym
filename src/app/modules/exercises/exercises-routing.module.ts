import { SchedulerComponent } from './../../components/scheduler/scheduler.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodyPartsComponent } from 'src/app/components/body-parts/body-parts.component';
import { ExercisesComponent } from 'src/app/components/exercises/exercises.component';

const routes: Routes = [
  {
    path: '',
    component: ExercisesComponent,
  },
  {
    path: 'body_parts',
    component: BodyPartsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExercisesRoutingModule {}

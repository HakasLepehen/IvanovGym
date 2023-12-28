import { SchedulerComponent } from './../../components/scheduler/scheduler.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MuscleGroupComponent } from 'src/app/components/muscle-group/muscle-group.component';
import { ExercisesComponent } from 'src/app/components/exercises/exercises.component';

const routes: Routes = [
  {
    path: '',
    component: ExercisesComponent,
  },
  {
    path: 'muscle_group',
    component: MuscleGroupComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExercisesRoutingModule {}

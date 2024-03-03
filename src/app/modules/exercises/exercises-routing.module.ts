import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExercisesListComponent } from 'src/app/components/exercises-list/exercises-list.component';
import { ExercisesMainComponent } from 'src/app/components/exercises-main/exercises-main/exercises-main.component';

const routes: Routes = [
  {
    path: '',
    component: ExercisesMainComponent,
    title: 'Упражнения'
  },
  {
    path: ':part',
    component: ExercisesListComponent,
    title: 'Список упражнений'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExercisesRoutingModule { }
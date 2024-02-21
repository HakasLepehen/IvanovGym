import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExercisesMainComponent } from 'src/app/components/exercises-main/exercises-main/exercises-main.component';
import { TestComponent } from 'src/app/components/test/test.component';

const routes: Routes = [
  {
    path: '',
    component: ExercisesMainComponent,
  },
  {
    path: ':part',
    component: TestComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExercisesRoutingModule { }
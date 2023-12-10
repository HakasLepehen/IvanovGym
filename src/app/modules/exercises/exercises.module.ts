import { NgModule } from '@angular/core';
import { TaigaModule } from '../taiga/taiga.module';
import { CommonModule } from '@angular/common';
import { ExercisesRoutingModule } from './exercises-routing.module';
import { ExercisesComponent } from 'src/app/components/exercises/exercises.component';

@NgModule({
  declarations: [ExercisesComponent],
  imports: [CommonModule, TaigaModule, ExercisesRoutingModule],
})
export class ExercisesModule {}

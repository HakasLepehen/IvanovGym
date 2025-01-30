import { TuiExpand } from "@taiga-ui/core";
import { NgModule } from '@angular/core';
import { TaigaModule } from '../taiga/taiga.module';
import { CommonModule } from '@angular/common';
import { ExercisesRoutingModule } from './exercises-routing.module';
import { ExercisesMainComponent } from 'src/app/components/exercises-main/exercises-main/exercises-main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderModule } from 'src/app/components/loader/loader.module';
import { ExercisesFormModule } from 'src/app/components/exercises-form/exercises-form.module';
import { AddingExerciseComponent } from 'src/app/components/adding-exercise/adding-exercise.component';

@NgModule({
  declarations: [ExercisesMainComponent],
  imports: [
    CommonModule,
    TaigaModule,
    FormsModule,
    ExercisesRoutingModule,
    ...TuiExpand,
    ReactiveFormsModule,
    LoaderModule,
    ExercisesFormModule,
    AddingExerciseComponent
  ],
})
export class ExercisesModule { }

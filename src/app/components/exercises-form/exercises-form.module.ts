import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExercisesFormComponent } from './exercises-form/exercises-form.component';
import { TuiButtonModule, TuiErrorModule, TuiExpandModule } from '@taiga-ui/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiFieldErrorPipe } from '@taiga-ui/kit';
import { TaigaModule } from 'src/app/modules/taiga/taiga.module';



@NgModule({
  declarations: [ExercisesFormComponent],
  imports: [
    TuiExpandModule,
    FormsModule,
    ReactiveFormsModule,
    TaigaModule
  ],
  exports: [ExercisesFormComponent]
})
export class ExercisesFormModule { }

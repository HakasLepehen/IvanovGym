import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ExercisesFormComponent } from './exercises-form/exercises-form.component';
import { TuiButtonModule, TuiDataListModule, TuiErrorModule, TuiExpandModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiDataListWrapperModule, TuiFieldErrorPipe, TuiFieldErrorPipeModule, TuiMultiSelectModule } from '@taiga-ui/kit';
import { TaigaModule } from 'src/app/modules/taiga/taiga.module';
import { TuiLetModule } from '@taiga-ui/cdk';



@NgModule({
  declarations: [ExercisesFormComponent],
  imports: [
    CommonModule,
    TaigaModule,
    FormsModule,
    ReactiveFormsModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
    TuiMultiSelectModule,
    TuiTextfieldControllerModule,
		TuiLetModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    AsyncPipe,
  ],
  exports: [ExercisesFormComponent]
})
export class ExercisesFormModule { }

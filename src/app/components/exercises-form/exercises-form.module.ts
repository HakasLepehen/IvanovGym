import { TuiLet } from "@taiga-ui/cdk";
import { TuiTextfieldControllerModule, TuiMultiSelectModule } from "@taiga-ui/legacy";
import { PolymorpheusComponent } from '@taiga-ui/polymorpheus';
import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ExercisesFormComponent } from './exercises-form/exercises-form.component';
import { TuiDialogService, TuiDataList, TuiError, TuiExpand, TuiButton } from '@taiga-ui/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiFieldErrorPipe, TuiDataListWrapper, TuiFieldErrorContentPipe } from '@taiga-ui/kit';
import { TaigaModule } from 'src/app/modules/taiga/taiga.module';

@NgModule({
  declarations: [ExercisesFormComponent],
  providers: [],
  exports: [ExercisesFormComponent],
  imports: [
    CommonModule,
    TaigaModule,
    FormsModule,
    ReactiveFormsModule,
    ...TuiDataList,
    ...TuiDataListWrapper,
    TuiMultiSelectModule,
    TuiTextfieldControllerModule,
    TuiLet,
    TuiError,
    TuiFieldErrorPipe, TuiFieldErrorContentPipe,
    AsyncPipe,
  ]
})
export class ExercisesFormModule { }

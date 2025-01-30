import { TuiLet } from "@taiga-ui/cdk";
import { TuiTextfieldControllerModule, TuiMultiSelectModule } from "@taiga-ui/legacy";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestComponent } from './test/test.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiDataList } from '@taiga-ui/core';
import { TuiDataListWrapper } from '@taiga-ui/kit';

@NgModule({
  declarations: [TestComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...TuiDataList,
    ...TuiDataListWrapper,
    TuiMultiSelectModule,
    TuiTextfieldControllerModule,
		TuiLet,
  ],
  exports: [TestComponent]
})
export class TestModule { }

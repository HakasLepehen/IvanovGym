import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestComponent } from './test/test.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiDataListModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiDataListWrapperModule, TuiMultiSelectModule } from '@taiga-ui/kit';
import { TuiLetModule } from '@taiga-ui/cdk';



@NgModule({
  declarations: [TestComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
    TuiMultiSelectModule,
    TuiTextfieldControllerModule,
		TuiLetModule,
  ],
  exports: [TestComponent]
})
export class TestModule { }

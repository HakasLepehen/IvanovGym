import { TuiLoader } from "@taiga-ui/core";
import { LoaderComponent } from './loader/loader.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [LoaderComponent],
  imports: [TuiLoader,],
  exports: [TuiLoader, LoaderComponent]
})
export class LoaderModule { }

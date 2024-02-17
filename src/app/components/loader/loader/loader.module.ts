import { LoaderComponent } from './../loader.component';
import { NgModule } from '@angular/core';
import { TuiLoaderModule } from '@taiga-ui/core';



@NgModule({
  declarations: [LoaderComponent],
  imports: [TuiLoaderModule,],
  exports: [TuiLoaderModule, LoaderComponent]
})
export class LoaderModule { }

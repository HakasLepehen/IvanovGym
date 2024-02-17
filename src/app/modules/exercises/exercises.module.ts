import { NgModule } from '@angular/core';
import { TaigaModule } from '../taiga/taiga.module';
import { CommonModule } from '@angular/common';
import { ExercisesRoutingModule } from './exercises-routing.module';
import { ExercisesComponent } from 'src/app/components/exercises/exercises.component';
import { TuiExpandModule } from '@taiga-ui/core';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderModule } from 'src/app/components/loader/loader/loader.module';
@NgModule({
  declarations: [ExercisesComponent],
  imports: [
    CommonModule,
    TaigaModule,
    ExercisesRoutingModule,
    DialogComponent,
    TuiExpandModule,
    ReactiveFormsModule,
    FormsModule,
    LoaderModule,
  ],
  // exports: [YouTubePlayerModule]
})
export class ExercisesModule {}

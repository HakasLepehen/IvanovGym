import { NgModule } from '@angular/core';
import { TaigaModule } from '../taiga/taiga.module';
import { CommonModule } from '@angular/common';
import { ExercisesRoutingModule } from './exercises-routing.module';
import { ExercisesComponent } from 'src/app/components/exercises/exercises.component';
import { TuiExpandModule } from '@taiga-ui/core';
import { MuscleGroupComponent } from 'src/app/components/muscle-group/muscle-group.component';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [ExercisesComponent, MuscleGroupComponent],
  imports: [
    CommonModule,
    TaigaModule,
    ExercisesRoutingModule,
    DialogComponent,
    TuiExpandModule,
    ReactiveFormsModule,
    FormsModule,
    // YouTubePlayerModule
  ],
  // exports: [YouTubePlayerModule]
})
export class ExercisesModule {}

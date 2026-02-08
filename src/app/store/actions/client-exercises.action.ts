import { createAction, props } from "@ngrx/store";
import { IExercise } from '../../interfaces/exercise';

export const setClientExercises = createAction('[Main Component] Set ClientExercises', props<{ clientExercises: IExercise[] }>());

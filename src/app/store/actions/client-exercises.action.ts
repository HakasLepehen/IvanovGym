import { createAction, props } from "@ngrx/store";
import IClientExercise from 'src/app/interfaces/client_exercise';

export const setClientExercises = createAction('[Main Component] Set ClientExercises', props<{ clientExercises: IClientExercise[] }>());
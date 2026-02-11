import { createReducer, on } from "@ngrx/store";
import * as ExercisesActions from '../actions/client-exercises.action';
import { initialExercisesState } from "../state/exercises.state";

export const clientExercisesReducer = createReducer(
  initialExercisesState,
  on(ExercisesActions.setClientExercises, (state, { clientExercises }) => ({ ...state, exercises: clientExercises }))
)
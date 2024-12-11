import { createReducer, on } from "@ngrx/store";
import * as ExercisesActions from '../actions/client-exercises.action';
import { initialClientExercisesState } from "../state/client-exercises.state";

export const clientExercisesReducer = createReducer(
  initialClientExercisesState,
  on(ExercisesActions.setClientExercises, (state, { clientExercises }) => ({...state, clientExercises: clientExercises}))
)
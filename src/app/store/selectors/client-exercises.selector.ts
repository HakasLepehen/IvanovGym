import { createSelector, State } from "@ngrx/store";
import { IExercisesState } from "../state/exercises.state";

const selectClientExercisesState = (state: any) => state.clientExercisesState;

export const clientExercisesSelector = createSelector(selectClientExercisesState,
  (state: IExercisesState) => state.exercises
);
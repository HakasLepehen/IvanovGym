import { createSelector, State } from "@ngrx/store";
import { IClientExercisesState } from "../state/client-exercises.state";

const selectClientExercisesState = (state: any) => state.clientExercisesState;

export const clientExercisesSelector = createSelector(selectClientExercisesState,
  (state: IClientExercisesState) => state.clientExercises
);
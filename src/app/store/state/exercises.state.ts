import { IExercise } from '../../interfaces/exercise';

export interface IExercisesState {
  exercises: IExercise[];
}

export const initialExercisesState: IExercisesState = {
  exercises: [],
}

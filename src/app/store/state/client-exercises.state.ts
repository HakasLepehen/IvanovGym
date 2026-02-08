import { IExercise } from '../../interfaces/exercise';

export interface IClientExercisesState {
  clientExercises: IExercise[];
}

export const initialClientExercisesState: IClientExercisesState = {
  clientExercises: [],
}

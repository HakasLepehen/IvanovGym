import IClientExercise from 'src/app/interfaces/client_exercise';

export interface IClientExercisesState {
  clientExercises: IClientExercise[];
}

export const initialClientExercisesState: IClientExercisesState = {
  clientExercises: [],
}
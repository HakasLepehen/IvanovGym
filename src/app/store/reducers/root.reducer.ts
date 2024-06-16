import { authReducer } from './auth.reducer';
import { exerciseReducer } from './exercise.reducer';

export const rootReducer = [
  {
    auth: authReducer,
    exercise: exerciseReducer
  },
];

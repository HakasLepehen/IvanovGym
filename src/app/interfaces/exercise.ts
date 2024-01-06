import { IExecutionVariant } from './execution_variant';
export interface IExercise {
  exercise_name: string;
  exec_var: Array<IExecutionVariant>;
  muscle_groups_id?: number;
}

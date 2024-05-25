import { BodyParts } from '../enums/body_parts';
import { IExecutionVariant } from './execution_variant';

/** using only for creating exercise in specific form */
export interface IExercise {
  id?: number
  exercise_name: string;
  exec_var?: Array<IExecutionVariant>;
  muscle_group: Array<number>;
}

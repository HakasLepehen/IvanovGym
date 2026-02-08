import { BodyParts } from '../enums/body_parts';
import { IExecutionVariant } from './execution_variant';

/** using only for creating exercise in specific form */
export interface IExercise {
  id?: number;
  name: string;
  url?: string;
  comment?: string;
  muscle_group?: number;
}

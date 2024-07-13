import { IExecutionVariant } from './execution_variant';
export default interface IClientExercise extends IExecutionVariant {
  exercise_fullname?: string;
  body_part_ids?: number[];
}
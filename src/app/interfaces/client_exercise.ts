import { IExecutionVariant } from './execution_variant';

/**
 * Интерфейс упражнения, который уже окончательно должен использоваться на клиенте
 */
export default interface IClientExercise extends IExecutionVariant {

  /** Полное наименование человекопонятного упражнения */
  exercise_fullname?: string;
  /** Идентификатор частей тела, к которым относится упражнения */
  body_part_ids?: number[];
}
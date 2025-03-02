/**
 *  Экземляр тренировки
 **/
export interface ITraining {
  // Идентификатор
  id?: number,
  // Строковый идентификатор клиента
  clientGUID: string,
  // Дата на которую запланирована тренировка
  planned_date: Date | string,
  // Год на который запланирована тренировка
  hour: number,
  // Год на который запланирована тренировка
  minutes: number,
  // Идентификаторы элементов тренировок(упражнение, повторения, подходы) специфичные для данной тренировки
  trainingExerciseIds?: number[]

  clientFullName?: string;
}
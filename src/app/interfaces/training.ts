/**
 *  Экземляр тренировки
 **/
export interface ITraining {
  // Идентификатор
  id?: number,
  // Строковый идентификатор клиента
  clientGUID: string,
  // День на который запланирована тренировка
  day: number,
  // Месяц на который запланирована тренировка
  month: number,
  // Год на который запланирована тренировка
  year: number,
  // Год на который запланирована тренировка
  hour: number,
  // Год на который запланирована тренировка
  minutes: number,
  // Идентификаторы элементов тренировок(упражнение, повторения, подходы) специфичные для данной тренировки
  trainingExerciseIds?: number[]

  clientFullName?: string;
}
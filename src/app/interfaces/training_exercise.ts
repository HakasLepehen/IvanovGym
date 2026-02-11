/**
 * Модель регистрируемого в тренировке упражнения
 * @param id Идентификатор упражнения. Необязательный параметр, возвращаемый с сервера
 * @param training_id Идентификатор тренировки к которой привязано упражнение. Необязательный параметр, возвращаемый с сервера
 * @param exercise_id Ссылка на идентификатор варианта выполнения упражнения
 * @param execution_number Количество повторений. Необязательный параметр
 * @param set_count Количество подходов. Необязательный параметр
 * @param payload_weight Назначаемые веса для выполнения. Представлен в виде массива. На клиенте должен будет парситься через разделитель. Необязательный параметр
 * @param comment Комментарий к упражнению. Необязательный параметр
 **/
export interface ITrainingExercise {
  id?: number,
  training_id?: number | null,
  exercise_id: number | null,
  execution_number?: string,
  set_count?: number,
  payload_weight?: string,
  comment?: string
}

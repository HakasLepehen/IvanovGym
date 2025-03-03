/**
 * Модель регистрируемого в тренировке упражнения 
 * @param id Идентификатор упражнения. Необязательный параметр, возвращаемый с сервера
 * @param exec_var_id Ссылка на идентификатор варианта выполнения упражнения
 * @param execution_number Количество подходов. Необязательный параметр
 * @param payload_weight Назначаемые веса для выполнения. Представлен в виде массива. На клиенте должен будет парситься через разделитель. Необязательный параметр
 * @param comment Комментарий к упражнению. Необязательный параметр
 **/
export interface ITrainingExercise {
  id?: number,
  exec_var_id: number,
  execution_number?: number,
  payload_weight?: Array<number>,
  comment?: string
}
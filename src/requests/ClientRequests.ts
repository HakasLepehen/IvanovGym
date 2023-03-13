import { IClient } from './../interfaces/Client';
import { supabase } from './../supaBaseClient';

/**
 * get array of clients
 * @example
 * // get array of clients and store data into state
 * getClients(args: Array<string>, useState);
 */
export const getClientsRequest = async (args: Array<string>) => {
  const params = args.join(', ');
  try {
    const { data } = await supabase.from('clients').select(params);
    return await data;
  } catch (error) {
    alert('We have error!');
    console.log('Error: ', error);
  }
};

export const getClient = async (id) => {
  try {
    const { data } = await supabase.from('clients').select().eq('id', id);
    return data[0];
  } catch (error) {
    console.log(error);
    alert('Ошибка получения клиента!');
  }
};

export const addClient = async (data: IClient) => {
  try {
    const { error } = await supabase
      .from('clients')
      .insert(data);
  } catch (error) {
    console.log(error)
  }
}

export const deleteClient = async (id: number) => {
  try {
    return await supabase
      .from('clients')
      .delete()
      .eq('id', id)
  } catch (error) {
    console.log(error);
    alert('Ошибка удаления клиента!');
  }
}

export const updateClient = async (body: IClient, id: number): Promise<void> => {
  try {
    const { data, error } = await supabase
      .from('clients')
      .update({ ...body })
      .eq('id', id )
  } catch (error) {
    alert('Не удалось обновить информацию о клиенте')
    console.log(error)
  }
}
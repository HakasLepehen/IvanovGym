import { supabase } from './../supaBaseClient';

/**
 * get array of clients
 * @example
 * // get array of clients and store data into state
 * getClients(args: Array<string>, useState);
 */
export const getClients = async (args: Array<string>, cb: Function) => {
  const params = args.join(', ');
  try {
    const { data } = await supabase.from('clients').select(params);
    cb(data);
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
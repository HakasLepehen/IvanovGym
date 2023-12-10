import { Injectable } from '@angular/core';
import { supabase } from 'src/app/optionsSupaBase';

@Injectable({
  providedIn: 'root'
})
export class BodyPartsService {

  constructor() { }

  async createBodyPart(model: any): Promise<void> {
    console.log(model);

    const { data, error } = await supabase.from('body_parts').insert([model]).select('*');

    if (error) {
      console.log(error);
      throw new Error('Не удалось добавить клиента, обратитесь к разработчику');
    }
  }

  async getBodyParts(): Promise<any[]> {
    const { data, error } = await supabase.from('body_parts').select();

    if (error) {
      console.log(error);
      throw new Error('Не удалось получить данные по частям тела, обратитесь к разработчику');
    }
    return data;
  }
}

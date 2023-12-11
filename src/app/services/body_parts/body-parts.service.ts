import { Injectable } from '@angular/core';
import { supabase } from 'src/app/optionsSupaBase';

@Injectable({
  providedIn: 'root'
})
export class BodyPartsService {

  constructor() { }

  async createBodyPart(model: any): Promise<void> {
    delete model.id;

    const { data, error } = await supabase.from('body_parts').insert([model]).select('*');

    if (error) {
      console.log(error);
      throw new Error('Не удалось добавить часть тела, обратитесь к разработчику');
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

  async removeBodyPart(id: number): Promise<void> {
    const { data, error } = await supabase.from('body_parts').delete().eq('id', id);

    if (error) {
      console.log(error);
      throw new Error('Не удалось удалить часть тела, обратитесь к разработчику');
    }
  }

  async editBodyPart(model: any): Promise<void> {
    const { data, error } = await supabase.from('body_parts').update(model).match({ id: model.id });

    if (error) {
      console.log(error);
      throw new Error('Не удалось отредактировать клиента, обратитесь к разработчику');
    }
  }
}

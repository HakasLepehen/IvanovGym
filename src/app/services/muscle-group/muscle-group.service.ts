import { Injectable } from '@angular/core';
import { supabase } from 'src/app/optionsSupaBase';

@Injectable({
  providedIn: 'root',
})
export class MuscleGroupService {
  constructor() {}

  async createBodyPart(model: any): Promise<void> {
    delete model.id;

    const { data, error } = await supabase.from('muscle_groups').insert([model]).select('*');

    if (error) {
      console.log(error);
      throw new Error('Не удалось добавить часть тела, обратитесь к разработчику');
    }
  }

  async getBodyParts(): Promise<any[]> {
    const { data, error } = await supabase.from('muscle_groups').select();

    if (error) {
      console.log(error);
      throw new Error('Не удалось получить данные по частям тела, обратитесь к разработчику');
    }
    return data;
  }

  async removeBodyPart(id: number): Promise<void> {
    const { data, error } = await supabase.from('muscle_groups').delete().eq('id', id);

    if (error) {
      console.log(error);
      throw new Error('Не удалось удалить часть тела, обратитесь к разработчику');
    }
  }

  async editBodyPart(model: any): Promise<void> {
    const { data, error } = await supabase.from('muscle_groups').update(model).match({ id: model.id });

    if (error) {
      console.log(error);
      throw new Error('Не удалось отредактировать клиента, обратитесь к разработчику');
    }
  }
}

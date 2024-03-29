import { Component } from '@angular/core';
import { TuiDay } from '@taiga-ui/cdk';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss']
})
export class SchedulerComponent {
  value: TuiDay | null = null;

  onDayClick(day: TuiDay | any): void {
    this.value = day;
    console.log(this.value);
  }
}

// Возможно, календарь не отображается на странице по нескольким причинам. Вот несколько возможностей:

// 1. Отсутствующие зависимости: Календарь TUI требует jQuery, Moment.js и TUI Code Snippet для правильной работы. Убедитесь, что вы включили эти библиотеки в свой проект.

// 2. Неправильный импорт: Убедитесь, что вы правильно импортировали модуль TUI Calendar в свой компонент Angular.

// 3. CSS: Календарь TUI полагается на свой собственный CSS для правильного отображения. Убедитесь, что вы включили CSS календаря TUI в свой проект.

// 4. Инициализация: Календарь TUI нужно инициализировать в файле TypeScript вашего компонента. Если он не инициализирован правильно, он не будет отображаться.

// 5. Данные: Если вы используете динамические данные для заполнения календаря и есть проблема с данными или способом их обработки, календарь может не отображаться.

// 6. Ошибки: Проверьте консоль вашего браузера на наличие ошибок JavaScript. Они могут дать подсказки о том, что идет не так.

// Без просмотра вашего кода трудно дать более конкретный ответ. Если у вас все еще возникают проблемы, пожалуйста, предоставьте больше деталей или поделитесь своим кодом.

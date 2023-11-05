import { Component } from '@angular/core';

type SectionType = {
   title: string;
   routeLink: string;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  content: Array<SectionType> = [
    {
      title: 'Управление клиентами',
      routeLink: 'clients'
    },
    {
      title: 'Назначение тренировок(пока не работает)',
      routeLink: 'trainings'
    }
  ]
}

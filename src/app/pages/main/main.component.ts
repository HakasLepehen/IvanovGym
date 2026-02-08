import { LoaderService } from './../../components/loader/loader.service';
import { IClient } from 'src/app/interfaces/client';
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
  public clients!: IClient[];
  public content: Array<SectionType> = [
    {
      title: 'Управление клиентами',
      routeLink: 'clients'
    },
    {
      title: 'Планировщик тренировок',
      routeLink: 'scheduler'
    },
    {
      title: 'Управление пользователями',
      routeLink: 'users-management'
    },
    {
      title: 'Упражнения',
      routeLink: 'exercises'
    }
  ];

  constructor() {}

  ngOnInit(): void {
  }
}

import { LoaderService } from './../../components/loader/loader.service';
import { IClient } from 'src/app/interfaces/client';
import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { tap } from 'rxjs';
import { ClientsConfigService } from 'src/app/components/clients/clients-config.service';
import { ExercisesConfigService } from 'src/app/components/exercises-main/exercises-config.service';
import IClientExercise from 'src/app/interfaces/client_exercise';
import { clientExercisesSelector } from 'src/app/store/selectors/client-exercises.selector';
// import { LoaderService } from 'src/app/components/loader/loader.service';

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

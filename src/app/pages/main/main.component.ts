import { IClient } from 'src/app/interfaces/client';
import { Component } from '@angular/core';
import { ClientsConfigService } from 'src/app/components/clients/clients-config.service';
import { ExercisesConfigService } from 'src/app/components/exercises-main/exercises-config.service';
import { Store, select } from '@ngrx/store';
import { tap } from 'rxjs';
import { IExercise } from 'src/app/interfaces/exercise';
import { clientExercisesSelector } from 'src/app/store/selectors/client-exercises.selector';
import { MainService } from 'src/app/services/main/main.service';

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

  constructor(
    private clientsConfigService: ClientsConfigService,
    private exerciseConfigService: ExercisesConfigService,
    private store: Store,
    private mainService: MainService
  ) {}

  ngOnInit(): void {
    this.clientsConfigService.getClients();
    this.exerciseConfigService.getExercisesForClient();

    this.store.pipe(
      select(clientExercisesSelector),
      tap((exercises: IExercise[]) => {
        this.clientsConfigService.setLimitNamesForClients(exercises)
      })
    ).subscribe()
  }
}

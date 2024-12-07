import { IClient } from 'src/app/interfaces/client';
import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subject, tap } from 'rxjs';
import { ClientsConfigService } from 'src/app/components/clients/clients-config.service';
import { clientsSelector } from 'src/app/store/selectors/client.selector';
import { ExercisesConfigService } from 'src/app/components/exercises-main/exercises-config.service';
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

  constructor(
    private _clientsConfigService: ClientsConfigService,
    private _exerciseConfigService: ExercisesConfigService,
    private store: Store
  ) {
    
  }

  ngOnInit(): void {
    this._clientsConfigService.getClients();
    this._exerciseConfigService.getExercisesForClient();
  }
}

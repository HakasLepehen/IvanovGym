import { Component } from '@angular/core';
import { ClientsConfigService } from 'src/app/components/clients/clients-config.service';
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
    // private _loaderService: LoaderService,
  ) {

  }

  ngOnInit(): void {
    this._clientsConfigService.getClients();
  }
}

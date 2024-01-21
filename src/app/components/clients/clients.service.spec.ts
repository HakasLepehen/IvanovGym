import { IClient } from './../../interfaces/client';
import { TuiDialogService } from '@taiga-ui/core';
import { HttpClient } from "@angular/common/http";
import { ClientsService } from "src/app/services/clients/clients.service";
import { LoaderService } from "src/app/services/loader/loader.service";
import { Subject, of } from 'rxjs';

describe('Clients service', () => {

  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let loaderSpy: jasmine.SpyObj<LoaderService>;
  let dialogsSpy: jasmine.SpyObj<TuiDialogService>;
  let clientService: ClientsService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    clientService = new ClientsService(httpClientSpy, loaderSpy, dialogsSpy);
  });

  it('should return array of clients', (done: DoneFn) => {
    const expectedClients: IClient[] = [
      {
        fullName: 'Петров Павел Валериевич',
        guid: 'dqwdasdqd',
        created_at: new Date(),
        age: 23,
        target: 'string',
        limits: 'string',
        experience: 'string',
        sleep: '',
        food: '',
        pharma: 'string',
        activity: '',
        avatar: '',
        id: 1
      }
    ];

    httpClientSpy.

    clientService.loadClients().subscribe({
      next: (value: any) => {
        expect(value).withContext('expected clients').toEqual(expectedClients);
        done;
      },
      error: done.fail,
    });
    // expect(httpClientSpy.get.calls.count()).withContext('need to call once').toBe(1);
  });

});
import { TestBed } from '@angular/core/testing';
import { ClientsService } from './clients.service';
import { HttpClient } from '@angular/common/http';
import { LoaderService } from '../loader/loader.service';
import { TuiDialogService } from '@taiga-ui/core';
import { Injector } from '@angular/core';
import { Observable } from 'rxjs';

describe('ClientService', () => {
  let service: ClientsService;
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [ClientsService] });
  });

  it('should be a work', () => {
    service = TestBed.inject(ClientsService);
    expect(service.getClients()).toBeInstanceOf(Observable);
  });
});

// describe('client\'s service should: ', () => {
//   let httpClientSpy: jasmine.SpyObj<HttpClient>;
//   let service: ClientsService;
//   beforeEach(() => {
//     httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
//     service = new ClientsService(httpClientSpy);
//   });

//   it('should get clients', (done: DoneFn) => {
//     done();
//     // const expectedClients: Client[] = [new Client('1'), new Client('2'), new Client('3')];
//     //
//     // httpClientSpy.get.and.returnValue(defer(() => Promise.resolve(expectedClients)));
//   });
// });

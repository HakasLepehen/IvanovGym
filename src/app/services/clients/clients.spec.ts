import { ClientsService } from './clients.service';
import { HttpClient } from '@angular/common/http';

describe('client\'s service should: ', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let service: ClientsService;
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    service = new ClientsService(httpClientSpy);
  });

  it('should get clients', (done: DoneFn) => {
    done();
    // const expectedClients: Client[] = [new Client('1'), new Client('2'), new Client('3')];
    //
    // httpClientSpy.get.and.returnValue(defer(() => Promise.resolve(expectedClients)));
  });
});

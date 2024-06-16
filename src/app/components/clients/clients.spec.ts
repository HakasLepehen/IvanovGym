import { ClientsService } from './clients.service';
import { TestBed, inject } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { LoaderService } from '../loader/loader.service';
import { TuiDialogService } from '@taiga-ui/core';
import { Injector } from '@angular/core';
import { IClient } from 'src/app/interfaces/client';
import { of } from 'rxjs';

let clientsService: ClientsService;
let clients = [
  {
      "id": 101,
      "created_at": "2023-11-05T16:26:37.690951+00:00",
      "fullName": "Москалев Руслан маратович",
      "age": "39",
      "target": "Набор массы",
      "limits": "",
      "experience": "",
      "sleep": "",
      "food": "",
      "pharma": "",
      "activity": "",
      "avatar": "",
      "guid": "64e138dc-83ee-4fa5-9a27-1cc12ee5c95f"
  },
  {
      "id": 102,
      "created_at": "2023-11-05T16:27:22.810152+00:00",
      "fullName": "Иванов Сергей Александрович",
      "age": "33",
      "target": "Набор массы ",
      "limits": "никаких",
      "experience": "33",
      "sleep": "Спит как лось",
      "food": "Ест все",
      "pharma": "Пьет все",
      "activity": "Никаких",
      "avatar": "",
      "guid": "70239de7-c114-4452-b2d9-192256225322"
  }
]
describe('Checking getting clients data from server', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [ClientsService, HttpClient, HttpHandler] });
    clientsService = TestBed.inject(ClientsService);
  });

  it('should be created', () => {
    expect(clientsService).toBeTruthy();
  });

  it('should return clients', (done: DoneFn) => {
    let clients: IClient[] = [
      {
        id: 101,
        created_at: new Date("2023-11-05T16:26:37.690951+00:00"),
        fullName: "Москалев Руслан маратович",
        age: 39,
        target: "Набор массы",
        limits: "",
        experience: "",
        sleep: "",
        food: "",
        pharma: "",
        activity: "",
        avatar: "",
        guid: "64e138dc-83ee-4fa5-9a27-1cc12ee5c95f"
      }
    ];

    spyOn(clientsService, 'getClients').and.returnValue(of(clients))
    clientsService.getClients().subscribe({
      next: (res) => {
        expect(res).toEqual(clients);
        done();
      },
      error: (err) => done.fail
    });
  });
})
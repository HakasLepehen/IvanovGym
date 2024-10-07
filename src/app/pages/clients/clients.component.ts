import { IClient } from 'src/app/interfaces/client';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Subject, combineLatest, combineLatestAll, forkJoin, map, of, take, takeUntil, tap } from 'rxjs';
import { ClientsService } from '../../components/clients/clients.service';
import { ClientsConfigService } from '../../components/clients/clients-config.service';
import { LoaderService } from 'src/app/components/loader/loader.service';
import { ExercisesConfigService } from '../../components/exercises-main/exercises-config.service';
import IClientExercise from 'src/app/interfaces/client_exercise';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent implements OnInit, OnDestroy {
  public clients: IClient[] = [];
  private exercises: IClientExercise[] = [];
  public isLoading = false;
  private unsubscribe$: Subject<void> = new Subject();

  constructor(
    private clientsService: ClientsService,
    private exercisesConfigService: ExercisesConfigService,
    private clientsConfigService: ClientsConfigService,
    private loaderService: LoaderService,
  ) { }

  ngOnInit() {
    this.clientsConfigService.getClients();
    this.getExercises();
    combineLatest([this.clientsService.clients$, this.exercisesConfigService.clientExercises$])
      .pipe(
        take(1),
        map(([clients, exercises]) => {
          clients.forEach((client: IClient) => {
            client.limits?.forEach(num => {
              let [comparedExercise] = exercises.filter(exercise => exercise.id === num);
              client.limitsNames =
                (!!client.limitsNames ? client.limitsNames + ', ' : '') + comparedExercise.exercise_fullname;
            })
          })
          this.clients = clients;
          this.exercises = exercises;
        })
      ).subscribe()
    this.loaderService.getLoading().subscribe(val => {
      this.isLoading = val
    });
  }

  addClient(): void {
    this.clientsConfigService.openModal({client: null, isEdit: false, exercises: this.exercises});
  }

  getClients(): void {
    this.clientsService.getClients();
  }

  getExercises() {
    this.exercisesConfigService.getExercisesForClient()
  }

  editClient(el: IClient): void {
    this.clientsConfigService.openModal({
      client: el,
      isEdit: true,
      exercises: this.exercises
    });
  }

  removeClient(el: IClient): void {
    this.clientsConfigService.removeClient(<string>el.guid)
  }

  ngOnDestroy(): void {
    this.clientsService.destroy$.next(true);
    this.unsubscribe$.next();
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { LoaderService } from './services/loader/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'IvanovGym';
  loadingState: boolean = false;

  constructor(
    private loader: LoaderService
  ) {
  }

  ngOnInit() {
    this.loadingState = this.loader.getLoading();
  }
}

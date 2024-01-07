import { Component, inject, OnInit } from '@angular/core';
import { LoaderService } from './services/loader/loader.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'IvanovGym';
  apiLoaded: boolean = false;

  constructor(
    private loader: LoaderService,
    private location: Location
  ) {
  }

  back() {
    this.location.back();
  }

  ngOnInit() {
  }
}

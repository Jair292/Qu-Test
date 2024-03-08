import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { dataService } from './services/data.service';
import { lastValueFrom } from 'rxjs';
import { PlanetComponent } from "./components/planet/planet.component";
import { DisplayDetailT } from './types/types';
import { PlanetInfoDetailComponent } from './components/planet-info-detail/planet-info-detail.component';
import { CommonModule } from '@angular/common';
import { mockPlanets } from './constants/mocks-constanst';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, PlanetComponent, PlanetInfoDetailComponent, CommonModule]
})
export class AppComponent implements OnInit{
  planetResponse: any;
  detailConfig: DisplayDetailT | undefined;
  
  constructor (private dataService: dataService) {}

  async ngOnInit() {
    this.planetResponse = await lastValueFrom(this.dataService.getPlanets({search: false, searchQ: ''}));
    // mock response for service down
    // this.planetResponse = mockPlanets;
  }

  displayDetail(event: DisplayDetailT) {
    this.detailConfig = {
      detail: event.detail,
      position: event.position,
      property: event.property
    } 
  }

  cleanDetail() {
    this.detailConfig = undefined;
  }
}

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { dataService } from './services/data.service';
import { lastValueFrom } from 'rxjs';
import { PlanetComponent } from "./components/planet/planet.component";
import { DisplayDetailT } from './types/types';
import { PlanetInfoDetailComponent } from './components/planet-info-detail/planet-info-detail.component';
import { CommonModule } from '@angular/common';
import { SortPipe } from './pipes/planet-sort.pipe';
import { mockPlanets } from './constants/mocks-constanst';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, PlanetComponent, PlanetInfoDetailComponent, CommonModule, SortPipe]
})
export class AppComponent implements OnInit{
  planetResponse: any;
  detailConfig: DisplayDetailT | undefined;
  sortDirection: 'desc' | 'asc' = 'desc';
  sortMap = new Map([
    ['asc', 'up'],
    ['desc', 'down'],
  ]);
  @ViewChild('sortingButton') sortingButton: ElementRef<HTMLButtonElement> | undefined;
  
  constructor (private dataService: dataService) {}

  async ngOnInit() {
    // this.planetResponse = await lastValueFrom(this.dataService.getPlanets({search: false, searchQ: ''}));
    // mock response for service down
    this.planetResponse = mockPlanets;
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

  changeSortDirection() {
    if (this.sortDirection === 'desc') {
      this.sortDirection = 'asc';
      this.sortingButton?.nativeElement.classList.replace('gg-arrow-down', 'gg-arrow-up')
    } else {
      this.sortingButton?.nativeElement.classList.replace('gg-arrow-up', 'gg-arrow-down')
      this.sortDirection = 'desc';
    }
    
  }
}

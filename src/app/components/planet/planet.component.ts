import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { AllwedPropertiesForDrillT, FilmT, ResidentT, PlanetT, DisplayDetailT } from '../../types/types';
import { dataService } from '../../services/data.service';
import { FILMS, RESIDENTS } from '../../constants/services-constants';

@Component({
  selector: 'planet',
  standalone: true,
  imports: [],
  templateUrl: './planet.component.html',
  styleUrl: './planet.component.scss'
})
export class PlanetComponent {
  @Input() planet: PlanetT | undefined = undefined;
  @Output() displayDetail = new EventEmitter<DisplayDetailT>();
  @ViewChild('planetInfoButton') planetInfoButton: ElementRef<HTMLButtonElement> | undefined;

  public displayPlanetInfo = false;
  public films: FilmT[] = [];
  public residents: ResidentT[] = [];
  public currentSelectedDetail: AllwedPropertiesForDrillT | undefined = undefined;

  constructor (private dataService: dataService, public elementRef: ElementRef<HTMLElement>) {}

  updatePlanetInfoButton() {
    if (this.planetInfoButton?.nativeElement.classList.contains('open')) {
      this.planetInfoButton?.nativeElement.classList.remove('open');
    } else {
      this.planetInfoButton?.nativeElement.classList.add('open');
    }
    this.displayDetail.emit({ property: '', detail: [] });
  }

  planetInfo() {
    this.displayPlanetInfo = !this.displayPlanetInfo;
    this.updatePlanetInfoButton();
  }

  setProperty(property: AllwedPropertiesForDrillT, requestResults: FilmT[] | ResidentT[]) {
    switch(property) {
      case FILMS: this.films = requestResults as FilmT[]; break;
      case RESIDENTS: this.residents = requestResults as ResidentT[]; break;
    }
    this.displayDetail.emit({ property, detail: this[property], position: this.elementRef.nativeElement.offsetTop });
  }

  validateExistingData(property: AllwedPropertiesForDrillT): boolean {
    return (property === FILMS && !this.films.length) || (property === RESIDENTS && !this.residents.length);
  }

  bindProperty(property: AllwedPropertiesForDrillT, elements: string[] | undefined) {
    if (!elements?.length) return;
    
    if (this[property].length > 0) {
      return this.displayDetail.emit({ property, detail: this[property], position: this.elementRef.nativeElement.offsetTop });
    }
    this.getPlanetPropInfo(property);
  }

  getPlanetPropInfo(property: AllwedPropertiesForDrillT) {
    if (this.planet && this.validateExistingData(property)) {
      const propertyContent = this.planet[property];
      this.dataService.getPlanetPropertyInfo(propertyContent).then((results)=> {
        this.setProperty(property, results);
      });
      // mock response for service down
      // this.setProperty(property, [{name: `mock ${property}`, gender: 'male', height: '10', homeworld: 'earth'}])
    }
  }
}

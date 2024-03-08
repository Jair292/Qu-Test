import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { dataService } from '../../services/data.service';
import { DisplayDetailT, FilmT, ResidentT } from '../../types/types';
import { FILMS, RESIDENTS } from '../../constants/services-constants';
import { of } from 'rxjs';
import { PlanetComponent } from './planet.component';

describe('PlanetComponent', () => {
  let component: PlanetComponent;
  let fixture: ComponentFixture<PlanetComponent>;
  let dataServiceStub: Partial<dataService>;

  beforeEach(async () => {
    dataServiceStub = {
      getPlanetPropertyInfo: jasmine.createSpy().and.returnValue(of([]))
    };

    await TestBed.configureTestingModule({
      imports: [PlanetComponent, HttpClientTestingModule],
      providers: [
        { provide: dataService, useValue: dataServiceStub }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlanetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle display planet info', () => {
    component.displayPlanetInfo = false;
    component.planetInfo();
    expect(component.displayPlanetInfo).toBe(true);

    component.planetInfo();
    expect(component.displayPlanetInfo).toBe(false);
  });

  it('should set property and emit detail', () => {
    const films: any[] = [{ title: 'Film 1' }, { title: 'Film 2' }];
    spyOn(component.displayDetail, 'emit');

    component.setProperty('films', films);

    expect(component.films).toEqual(films);
    expect(component.displayDetail.emit).toHaveBeenCalledWith({ property: 'films', detail: films, position: jasmine.any(Number) });
  });

  it('should validate existing data', () => {
    component.films = [{ title: 'Film 1' }];
    expect(component.validateExistingData('films')).toBe(false);

    component.films = [];
    expect(component.validateExistingData('films')).toBe(true);
  });

  it('should bind property', () => {
    spyOn(component, 'getPlanetPropInfo');

    component.bindProperty('films', undefined);
    expect(component.getPlanetPropInfo).not.toHaveBeenCalled();

    component.bindProperty('films', ['Film 1', 'Film 2']);
    expect(component.getPlanetPropInfo).toHaveBeenCalledWith('films');
  });
});

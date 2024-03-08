import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanetInfoDetailComponent } from './planet-info-detail.component';
import { CommonModule } from '@angular/common';

describe('PlanetInfoDetailComponent', () => {
  let component: PlanetInfoDetailComponent;
  let fixture: ComponentFixture<PlanetInfoDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanetInfoDetailComponent, CommonModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlanetInfoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return property value of element', () => {
    const element = { title: 'Film Title', director: 'Director Name' };
    const property = 'title';

    const result = component.propertyValue(element, property);

    expect(result).toEqual('Film Title');
  });

  it('should check if property is allowed', () => {
    const allowedProperties = ['title', 'director', 'producer'];
    component.allowedProperties = allowedProperties;

    expect(component.allowedProperty('title')).toBe(true);
    expect(component.allowedProperty('director')).toBe(true);
    expect(component.allowedProperty('producer')).toBe(true);
    expect(component.allowedProperty('unknown')).toBe(false);
  });
});

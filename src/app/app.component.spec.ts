import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { dataService } from './services/data.service';
import { of } from 'rxjs';
import { DisplayDetailT } from './types/types';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let dataServiceStub: jasmine.SpyObj<dataService>;

  beforeEach(async () => {
    const dataServiceSpy = jasmine.createSpyObj('dataService', ['getPlanets']);
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [{ provide: dataService, useValue: dataServiceSpy }]
    }).compileComponents();

    dataServiceStub = TestBed.inject(dataService) as jasmine.SpyObj<dataService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch planets on initialization', async () => {
    const mockPlanets = { results: [{ name: 'Planet 1', films: ['url1', 'url2'], residents: ['resident1', 'resident2'] }] };
    dataServiceStub.getPlanets.and.returnValue(of(mockPlanets));

    await component.ngOnInit();

    expect(component.planetResponse).toEqual(mockPlanets);
  });

  it('should display detailConfig', () => {
    const event: DisplayDetailT = { property: 'films', detail: [{ title: 'Film 1' }], position: 100 };
    component.displayDetail(event);

    expect(component.detailConfig).toEqual(event);
  });

  it('should clean detail', () => {
    component.cleanDetail();

    expect(component.detailConfig).toBeUndefined();
  });
});

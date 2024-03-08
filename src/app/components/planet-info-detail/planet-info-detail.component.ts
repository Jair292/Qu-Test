import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisplayDetailT, FilmT, ResidentT, allowedPropertiesForDetails } from '../../types/types';
import { ObjectKeysPipe } from '../../pipes/object-key.pipe';

@Component({
  selector: 'planet-info-detail',
  standalone: true,
  imports: [CommonModule, ObjectKeysPipe],
  templateUrl: './planet-info-detail.component.html',
  styleUrl: './planet-info-detail.component.scss'
})
export class PlanetInfoDetailComponent implements OnChanges{
  @Input() detailConfig: DisplayDetailT | undefined;

  public allowedProperties = allowedPropertiesForDetails;

  constructor(public elementRef: ElementRef<HTMLElement>) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['detailConfig']?.previousValue !== changes['detailConfig']?.currentValue) {
      console.log(this.detailConfig?.position);
      this.elementRef.nativeElement.style.setProperty('margin-top', `${this.detailConfig?.position}px`);
    }
  }

  propertyValue(element: FilmT | ResidentT, property: string): any {
    return (element as any)[property]
  }

  allowedProperty(property: string): boolean {
    return this.allowedProperties.includes(property);
  }
}

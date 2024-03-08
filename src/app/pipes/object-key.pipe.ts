import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ObjectKeys',
  standalone: true,
})
export class ObjectKeysPipe implements PipeTransform {
  transform(item: any): string[] {
    if (typeof item === 'object' && item !== null) {
      try {
        return Object.keys(item);
      } catch (error) {
        console.error('Error while transforming object keys:', error);
        return [];
      }
    } else {
      return [];
    }
  }
}
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortP',
  standalone: true,
  pure: true
})
export class SortPipe implements PipeTransform {
  transform(items: any[], property: string, order: 'asc' | 'desc' = 'asc'): any[] {
    if (!items || !property || !order) {
      return items;
    }

    try {
      console.log(1);
      return items.slice().sort((a, b) => {
        if (typeof a[property] === 'string' && typeof b[property] === 'string') {
          return order === 'asc' ? a[property].localeCompare(b[property]) : b[property].localeCompare(a[property]);
        } else if (typeof a[property] === 'number' && typeof b[property] === 'number') {
          return order === 'asc' ? a[property] - b[property] : b[property] - a[property];
        } else {
          return 0;
        }
      });
    } catch (e) {
      return [];
    }
  }
}

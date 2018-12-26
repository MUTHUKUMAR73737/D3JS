import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'defaultSearch'
})
export class DefaultPipe implements PipeTransform {
  transform(items: any, args?: any): any {
    if (items !== undefined) {
      for (let i = 0; i < items.length; i++) {
        console.log('Default pipe - ' + items[i].productName);
      }
      return items;
    } else {
      return null;
    }
  }
}

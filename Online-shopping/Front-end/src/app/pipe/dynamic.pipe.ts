import { Pipe, PipeTransform } from '@angular/core';
import { HighToLowSortPipe, LowToHighSortPipe} from './price-sort.pipe';
import { DefaultPipe } from './default.pipe';

@Pipe({
  name: 'dynamicPipe'
})
export class DynamicPipe implements PipeTransform {
  constructor(
    private highToLow: HighToLowSortPipe,
    private lowToHigh: LowToHighSortPipe,
    private defaultPipe: DefaultPipe
  ) {}

  transform(value, pipe) {
    if (pipe === 'priceLowToHigh') {
      return this.lowToHigh.transform(value);
    }
    if (pipe === 'priceHighToLow') {
      return this.highToLow.transform(value);
    }
    if (pipe === 'default') {
      return this.defaultPipe.transform(value);
    }
  }
}

import { Pipe, PipeTransform } from '@angular/core';
import { UniqueBrandPipe, UniqueRAMPipe, UniqueColorPipe } from './unique.pipe';
import { PriceSelectionPipe } from './price-selection.pipe';

@Pipe({
  name: 'watchProductSelectionUnique'
})
export class WatchProductUniquePipe implements PipeTransform {

  constructor(private uniqueBrand: UniqueBrandPipe, private uniqueColor: UniqueColorPipe) {}

  transform(totalProduct , filterType: any) {
    if (filterType === 'uniqueBrand') {
     return this.uniqueBrand.transform(totalProduct);
    } else if (filterType === 'uniqueColor') {
      return this.uniqueColor.transform(totalProduct);
    } else {
      return null;
    }

  }
}

import { Pipe, PipeTransform } from '@angular/core';

import { DynamicPipe } from './dynamic.pipe';
import { PriceSelectionPipe } from './price-selection.pipe';
import { WatchBrandPipe, WatchColorPipe } from './watch-product.pipe';

@Pipe({
  name: 'watchProductPipe'
})
export class WatchProductPipe implements PipeTransform {
  constructor(
    private dynamic: DynamicPipe,
    private priceSelection: PriceSelectionPipe,
    private watchBrand: WatchBrandPipe,
    private watchColor: WatchColorPipe
  ) {}

  transform(watchProduct, typeSelection, selectedProduct, priceSort, priceSelection: any) {

    if (typeSelection.size === 0) {
      return this.dynamic.transform(this.priceSelection.transform(watchProduct, priceSelection), priceSort);
    } else {
      for (let iterate = typeSelection.values(), val = null; (val = iterate.next().value);) {
        if (typeSelection.size === 1) {
          console.log('Pipe size 1');
          if (val === 'brandName') {
            return this.watchBrand.transform(watchProduct, selectedProduct, priceSort);
          } else if (val === 'color') {
            return this.watchColor.transform(watchProduct, selectedProduct, priceSort);
          }
        } else if (typeSelection.size > 1) {
          console.log('Pipe size 2');
          if (val === 'brandName') {
            return this.watchBrand.transform(watchProduct, selectedProduct, priceSort, typeSelection);
          }
        }
      }
    }
  }
}

import { Pipe, PipeTransform } from '@angular/core';
import {MobileProductUniquePipe} from './mobile-product-selection-unique.pipe';
import { WatchProductUniquePipe } from './watch-product-selection-unique.pipe';


@Pipe({
  name: 'productSelectionUnique'
})
export class ProductSelectionUniquePipe implements PipeTransform {

  constructor(
    private mobileProductUnique: MobileProductUniquePipe,
    private watchProductUnique: WatchProductUniquePipe
    ) {}

  transform(totalProduct, productType, filterType: any) {
      if (productType === 'mobile') {
        return  this.mobileProductUnique.transform(totalProduct, filterType);
      } else if (productType === 'Watches') {
       return this.watchProductUnique.transform(totalProduct, filterType);
      }
  }
}

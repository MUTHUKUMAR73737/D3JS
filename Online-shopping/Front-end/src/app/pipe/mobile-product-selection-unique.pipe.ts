import { Pipe, PipeTransform } from '@angular/core';
import { UniqueBrandPipe, UniqueRAMPipe } from './unique.pipe';
import { PriceSelectionPipe } from './price-selection.pipe';

@Pipe({
  name: 'mobileProductSearchUnique'
})
export class MobileProductUniquePipe implements PipeTransform {

  constructor(private uniqueBrand: UniqueBrandPipe, private uniqueRAM: UniqueRAMPipe, private priceSort: PriceSelectionPipe) {}

  transform(totalProduct , filterType: any) {
    if (filterType === 'uniqueBrand') {
     return this.uniqueBrand.transform(totalProduct);
    } else if (filterType === 'uniqueRAM') {
      return this.uniqueRAM.transform(totalProduct);
    } else {
      return null;
    }

  }
}

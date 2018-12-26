import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'uniqueBrand'
})
export class UniqueBrandPipe implements PipeTransform {

  transform(items: any, selectedItem?: any): any {
   const filteredProduct = new Set<String>();
   if (items !== undefined) {
      for (let item = 0; item < items.length; item++) {
        filteredProduct.add(items[item].productBrand);
      }
      return filteredProduct;
    } else {
      return null;
    }
  }
}


@Pipe({
  name: 'uniqueRAM'
})
export class UniqueRAMPipe implements PipeTransform {

  transform(items: any, selectedItem?: any): any {
   const filteredProduct = new Set<String>();
      if (items !== undefined) {
        for (let item = 0; item < items.length; item++) {
          filteredProduct.add(items[item]['specification'].RAM);
        }
        return filteredProduct;
      } else {
        return null;
      }

  }
}


@Pipe({
  name: 'uniqueColor'
})
export class UniqueColorPipe implements PipeTransform {

  transform(items: any, selectedItem?: any): any {
   const filteredProduct = new Set<String>();
      if (items !== undefined) {
        for (let item = 0; item < items.length; item++) {
          filteredProduct.add(items[item].productColor);
        }
        return filteredProduct;
      } else {
        return null;
      }
  }
}



import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultPipe } from './default.pipe';
import { DynamicPipe } from './dynamic.pipe';
import { HighToLowSortPipe, LowToHighSortPipe } from './price-sort.pipe';
import { GeneralSearchPipe } from './general-search.pipe';
import {  UniqueBrandPipe, UniqueRAMPipe } from './unique.pipe';
import { MobileBrandPipe, MobileRAMPipe } from './mobile-product';
import { MobileProductPipe } from './mobile-product-selection.pipe';
import {ProductSelectionPipe } from './product-selection.pipe';
import { ProductSelectionUniquePipe  } from './product-selection-unique.pipe';
import { PriceSelectionPipe } from './price-selection.pipe';
import { MobileProductTypePipe, WatchProductTypePipe} from './product-type.pipe';
import {MobileProductUniquePipe} from './mobile-product-selection-unique.pipe';
import { WatchBrandPipe, WatchColorPipe } from './watch-product.pipe';
import { WatchProductPipe } from './watch-product-selection.pipe';
import { WatchProductUniquePipe } from './watch-product-selection-unique.pipe';

@NgModule({
  declarations: [
    DefaultPipe,
    DynamicPipe,
    HighToLowSortPipe,
    LowToHighSortPipe,
    GeneralSearchPipe,
    UniqueBrandPipe,
    UniqueRAMPipe,
    MobileBrandPipe,
    MobileProductPipe,
    MobileRAMPipe,
    MobileProductTypePipe,
    PriceSelectionPipe,
    ProductSelectionUniquePipe,
    MobileProductUniquePipe,
    ProductSelectionPipe,
    WatchProductTypePipe,
    WatchBrandPipe,
    WatchColorPipe,
    WatchProductPipe,
    WatchProductUniquePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DefaultPipe,
    DynamicPipe,
    HighToLowSortPipe,
    LowToHighSortPipe,
    GeneralSearchPipe,
    UniqueBrandPipe,
    UniqueRAMPipe,
    MobileBrandPipe,
    MobileProductPipe,
    MobileRAMPipe,
    MobileProductTypePipe,
    PriceSelectionPipe,
    ProductSelectionUniquePipe,
    MobileProductUniquePipe,
    ProductSelectionPipe,
    WatchBrandPipe,
    WatchColorPipe,
    WatchProductPipe,
    WatchProductUniquePipe,
    WatchProductTypePipe,
  ]
})
export class PipeModule { }

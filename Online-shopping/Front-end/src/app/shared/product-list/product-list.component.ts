import {
  Component,
  OnInit,
  AfterViewInit,
  AfterViewChecked
} from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { DynamicPipe } from 'src/app/pipe/dynamic.pipe';
import {
  HighToLowSortPipe,
  LowToHighSortPipe
} from 'src/app/pipe/price-sort.pipe';
import { DefaultPipe } from 'src/app/pipe/default.pipe';
import { Product } from 'src/app/Model/product';
import { ProductSelectionPipe } from 'src/app/pipe/product-selection.pipe';
import { MobileProductPipe } from 'src/app/pipe/mobile-product-selection.pipe';
import { MobileBrandPipe, MobileRAMPipe } from 'src/app/pipe/mobile-product';
import { MenuItem } from 'primeng/api';
import { MobileProductUniquePipe } from 'src/app/pipe/mobile-product-selection-unique.pipe';
import { ProductSelectionUniquePipe } from 'src/app/pipe/product-selection-unique.pipe';
import { PriceSelectionPipe } from 'src/app/pipe/price-selection.pipe';
import {
  UniqueBrandPipe,
  UniqueRAMPipe,
  UniqueColorPipe
} from 'src/app/pipe/unique.pipe';
import { Router, ActivatedRoute } from '@angular/router';
import {
  WatchBrandPipe,
  WatchColorPipe
} from 'src/app/pipe/watch-product.pipe';
import { WatchProductPipe } from 'src/app/pipe/watch-product-selection.pipe';
import { WatchProductTypePipe } from 'src/app/pipe/product-type.pipe';
import { WatchProductUniquePipe } from 'src/app/pipe/watch-product-selection-unique.pipe';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'e-shopping-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [
    ProductService,
    DynamicPipe,
    HighToLowSortPipe,
    LowToHighSortPipe,
    DefaultPipe,
    MobileBrandPipe,
    MobileProductPipe,
    MobileRAMPipe,
    PriceSelectionPipe,
    UniqueBrandPipe,
    UniqueRAMPipe,
    ProductSelectionUniquePipe,
    MobileProductUniquePipe,
    ProductSelectionPipe,
    UniqueColorPipe,
    WatchBrandPipe,
    WatchColorPipe,
    WatchProductPipe,
    WatchProductTypePipe,
    WatchProductUniquePipe,
    TitleCasePipe
  ]
})
export class ProductListComponent
  implements OnInit, AfterViewInit, AfterViewChecked {
  totalProductDetails: Product[]; // total product response from DB
  pricePipeName: String = 'default'; // price filtering default
  selectedProduct: any[]; // selected filtering(Eg- 6GB, Xiaomi)
  typeSelection = new Set<String>(); // filtered product elements(Eg- brandName, price)
  memoryType: number = 0;
  brandType: number = 0;
  colorType: number = 0;
  paginatedProductResponse: Product[]; // pagination
  lengthOfTotalProduct: Number; // Total length of product list
  minValue: number = 500;
  maxValue: number = 30000; // price range selection
  priceSelection: number[] = [this.minValue, this.maxValue]; // price range selection
  breadCrumbItems: MenuItem[]; // Bread crumb items

  productTypeObject: Object;
  productType: any; // product type selection

  constructor(
    private productService: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleCasePipe: TitleCasePipe
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.productType = params.get('productType');
      this.productTypeObject = {
        productType: params.get('productType')
      };

      this.productService
        .getProductDetailsByType(this.productTypeObject)
        .subscribe(
          response => {
            this.totalProductDetails = response;
            console.log(this.totalProductDetails);
            console.log(typeof this.totalProductDetails);
            // this.lengthOfTotalProduct = this.totalProductDetails.length;
            // this.paginatedProductResponse = this.totalProductDetails.slice(0, 3);
          },
          error => {
            console.log(error);
          }
        );
    });

    this.breadCrumbItems = [
      { icon: 'pi pi-home', routerLink: '/home' },
      // { label: 'Home', routerLink: '/home' },
      { label: `${this.titleCasePipe.transform(this.productType)}` }
    ];

  }

  sendProductNameToDescription(productName, product) {
    console.log(productName + ' ----- ' + product.stock);
    this.router.navigate([`productDescription/${productName}`]);
  }

  priceSelectionChange(event) {
    this.priceSelection.pop();
    this.priceSelection.pop();
    if (this.priceSelection.length === 0) {
      this.priceSelection.push(this.minValue, this.maxValue);
    }
  }

  paginate(event) {
    // this.pipe = ' ';
    this.paginatedProductResponse = this.totalProductDetails.slice(
      event.first,
      event.first + event.rows
    );
  }

  ngAfterViewInit() {
    console.log('After view init');
  }

  ngAfterViewChecked() {
    // console.log('After view checked');
  }

  memoryFilter(event) {
    if (event === true && this.selectedProduct.length > 0) {
      this.pricePipeName = 'default';
      this.typeSelection.add('MemorySearch');
      this.memoryType++;
      console.log(this.typeSelection);
    } else if (event === true && this.selectedProduct.length === 0) {
      this.pricePipeName = 'default';
      this.typeSelection.add('MemorySearch');
      // console.log(this.typeSelection);
      this.memoryType++;
    } else if (event === false && this.selectedProduct.length > 0) {
      this.pricePipeName = 'default';
      this.memoryType--;
      if (this.memoryType === 0) {
        this.typeSelection.delete('MemorySearch');
      }
      // console.log(this.typeSelection);
    } else if (event === false && this.selectedProduct.length === 0) {
      this.pricePipeName = 'default';
      this.typeSelection.delete('MemorySearch');
      // console.log(this.typeSelection);
    }
  }
  colorFilter(event) {
    if (event === true && this.selectedProduct.length > 0) {
      this.pricePipeName = 'default';
      this.typeSelection.add('color');
      this.colorType++;
      console.log(this.typeSelection);
    } else if (event === true && this.selectedProduct.length === 0) {
      this.pricePipeName = 'default';
      this.typeSelection.add('color');
      this.colorType++;
      console.log(this.typeSelection);
    } else if (event === false && this.selectedProduct.length > 0) {
      this.pricePipeName = 'default';
      this.colorType--;
      if (this.colorType === 0) {
        this.typeSelection.delete('color');
      }
      console.log(this.typeSelection);
    } else if (event === false && this.selectedProduct.length === 0) {
      this.pricePipeName = 'default';
      this.typeSelection.delete('color');
      console.log(this.typeSelection);
    }
  }

  brandFilter(event) {
    if (event === true && this.selectedProduct.length > 0) {
      this.pricePipeName = 'default';
      this.typeSelection.add('brandName');
      this.brandType++;
      console.log(this.typeSelection);
    } else if (event === true && this.selectedProduct.length === 0) {
      this.pricePipeName = 'default';
      this.typeSelection.add('brandName');
      this.brandType++;
      console.log(this.typeSelection);
    } else if (event === false && this.selectedProduct.length > 0) {
      this.pricePipeName = 'default';
      this.brandType--;
      if (this.brandType === 0) {
        this.typeSelection.delete('brandName');
      }
      console.log(this.typeSelection);
    } else if (event === false && this.selectedProduct.length === 0) {
      this.pricePipeName = 'default';
      this.typeSelection.delete('brandName');
      console.log(this.typeSelection);
    }
  }

  getHighToLow() {
    this.pricePipeName = 'priceHighToLow';
  }

  getLowToHigh() {
    this.pricePipeName = 'priceLowToHigh';
  }
}

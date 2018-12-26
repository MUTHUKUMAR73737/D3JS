import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import { OwlCarousel } from 'ngx-owl-carousel';
import { ProductService } from 'src/app/service/product.service';
import { Product } from 'src/app/Model/product';
import { Router } from '@angular/router';


@Component({
  selector: 'e-shopping-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [OwlCarousel]
})
export class HomeComponent implements OnInit, AfterViewInit {

  totalProductDetails: any[];
  images: any[] = [
    // '../../../assets/images/Home/1519724313.jpg',
    '../../../assets/images/Home/flipkart-1.jpg',
    // '../../../assets/images/Home/Flipkart-Offers.jpg',
    '../../../assets/images/Home/ice_screenshot_20180320-224602.jpg',
    // '../../../assets/images/Home/flipkart-samsung-delight-delivery.jpg',
    // '../../../assets/images/Home/flipkart-hdfc-offer.jpg',
    // '../../../assets/images/Home/flipkart_upcomig_offer.jpg',
    // '../../../assets/images/Home/flipkart-deals-of-the-day.jpg'
    // '../../../assets/images/Home/1234.jpg',
    // '../../../assets/images/Home/Online-Shopping-Banner.png'
  ];

  // @ViewChild('owlElement') owlElement: OwlCarousel;
  // @ViewChild('owlElement1') owlElement1: OwlCarousel;
  // @ViewChild('owlElement2') owlElement2: OwlCarousel;

  constructor(private productService: ProductService, private router: Router) {}
  ngOnInit() {
    this.productService.getProductDetails().subscribe(
      response => {
        this.totalProductDetails = response;
      },
      error => {
        console.log(error);
      }
    );
  }

  ngAfterViewInit() {
  }

  productSelection(productName) {
    this.router.navigate([`productDescription/${productName}`]);
  }
}







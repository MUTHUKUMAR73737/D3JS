import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { DescriptionComponent } from './description/description.component';
import { ProductListComponent } from './product-list/product-list.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { OwlModule } from 'ngx-owl-carousel';
import { ButtonModule } from 'primeng/button';
import { HeaderSearchbarComponent } from './header-searchbar/header-searchbar.component';
import { FormsModule } from '@angular/forms';
import { PipeModule } from '../pipe/pipe.module';
import { PanelModule } from 'primeng/panel';
import { CheckboxModule } from 'primeng/checkbox';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { KeyFilterModule } from 'primeng/keyfilter';
import {PaginatorModule} from 'primeng/paginator';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {TabViewModule} from 'primeng/tabview';
import {SliderModule} from 'primeng/slider';
import {GalleriaModule} from 'primeng/galleria';
import { ProductComparisonComponent } from './product-comparison/product-comparison.component';
import {MenuModule} from 'primeng/menu';
import {MenuItem} from 'primeng/api';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { ToastModule } from 'primeng/toast';
@NgModule({
  declarations: [
    HomeComponent,
    DescriptionComponent,
    ProductListComponent,
    NavigationBarComponent,
    HeaderComponent,
    FooterComponent,
    HeaderSearchbarComponent,
    ProductComparisonComponent
  ],
  imports: [
    CommonModule,
    OwlModule,
    ButtonModule,
    FormsModule,
    PipeModule,
    PanelModule,
    MenuModule,
    CheckboxModule,
    ProgressSpinnerModule,
    AutoCompleteModule,
    ButtonModule,
    KeyFilterModule,
    PaginatorModule,
    BreadcrumbModule,
    TabViewModule,
    SliderModule,
    GalleriaModule,
    ToastModule
  ],
  exports: [
    HomeComponent,
    DescriptionComponent,
    ProductListComponent,
    NavigationBarComponent,
    HeaderComponent,
    HeaderSearchbarComponent,
    FooterComponent
  ]
})
export class SharedModule {}

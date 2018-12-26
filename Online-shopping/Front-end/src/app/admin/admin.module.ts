import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavigationBarComponent } from './side-navigation-bar/side-navigation-bar.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ViewProductComponent } from './view-product/view-product.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AddUpdateProductComponent } from './add-update-product/add-update-product.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { InputMaskModule, InputTextModule, DropdownModule, MultiSelectModule, SliderModule } from 'primeng/primeng';
import {ToastModule} from 'primeng/toast';
import {FileUploadModule} from 'primeng/fileupload';
import {KeyFilterModule} from 'primeng/keyfilter';
import { TableModule } from 'primeng/table';
import {TooltipModule} from 'primeng/tooltip';

@NgModule({
  declarations: [
    SideNavigationBarComponent,
    ViewProductComponent,
    AdminHomeComponent,
    AddUpdateProductComponent
  ],
  imports: [
    CommonModule,
    SidebarModule,
    ReactiveFormsModule,
    ButtonModule,
    InputMaskModule,
    TooltipModule,
    DropdownModule,
    FormsModule,
    ToastModule,
    TableModule,
    MultiSelectModule,
    SliderModule,
    FileUploadModule,
    TooltipModule,
    InputTextModule,
    KeyFilterModule,
    MenuModule,
    AdminRoutingModule
  ],
  exports: [
    SideNavigationBarComponent,
    ViewProductComponent,
    AdminHomeComponent,
    AddUpdateProductComponent
  ]
})
export class AdminModule {}

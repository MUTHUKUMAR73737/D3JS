import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart/cart.component';
import { PlaceOrderComponent } from './place-order/place-order.component';
import { UserRoutingModule } from './user-routing-module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { KeyFilterModule } from 'primeng/keyfilter';
import { InputMaskModule } from 'primeng/inputmask';
import { TooltipModule } from 'primeng/tooltip';
import { ToastModule } from 'primeng/toast';
import { MatStepperModule, MatInputModule } from '@angular/material';
import {DropdownModule} from 'primeng/dropdown';
import {CaptchaModule} from 'primeng/captcha';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {CartPriceDirective} from './directive/cart-component.directive';
import {RadioButtonModule} from 'primeng/radiobutton';
import {AccordionModule} from 'primeng/accordion';
@NgModule({
  declarations: [CartComponent, PlaceOrderComponent, CartPriceDirective],
  imports: [
    CommonModule,
    // BrowserAnimationsModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    TooltipModule,
    HttpClientModule,
    FormsModule,
    ToastModule,
    InputTextareaModule,
    DropdownModule,
    RadioButtonModule,
    AccordionModule,
    CaptchaModule,
    TooltipModule,
    InputTextModule,
    InputMaskModule,
    KeyFilterModule,
    PasswordModule,
    ButtonModule,
    MatDialogModule,
    UserRoutingModule
  ]
})
export class UserModule {}

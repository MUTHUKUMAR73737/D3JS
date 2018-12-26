import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { LoginComponent } from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {InputTextModule} from 'primeng/inputtext';
import {PasswordModule} from 'primeng/password';
import {ButtonModule} from 'primeng/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {HttpClientModule} from '@angular/common/http';
import { SignupComponent } from './signup/signup.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {CaptchaModule} from 'primeng/captcha';
import {KeyFilterModule} from 'primeng/keyfilter';
import {InputMaskModule} from 'primeng/inputmask';
import {TooltipModule} from 'primeng/tooltip';
import {ToastModule} from 'primeng/toast';
import {MatStepperModule, MatInputModule} from '@angular/material';



@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    TooltipModule,
    HttpClientModule,
    FormsModule,
    ToastModule,
    TooltipModule,
    InputTextModule,
    InputMaskModule,
    CaptchaModule,
    KeyFilterModule,
    PasswordModule,
    ButtonModule,
    MatDialogModule
  ],
  declarations: [
    LoginComponent,
    SignupComponent,
    ForgotPasswordComponent,
  ], exports: [
    LoginComponent,
    SignupComponent,
    ForgotPasswordComponent
  ]
})
export class LoginModule { }

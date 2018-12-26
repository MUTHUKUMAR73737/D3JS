import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { SharedModule } from './shared/shared.module';
import { OwlModule } from 'ngx-owl-carousel';
import { HttpClientModule } from '@angular/common/http';
import { PipeModule } from './pipe/pipe.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login/login.component';
import { SignupComponent } from './login/signup/signup.component';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './Error/page-not-found/page-not-found.component';
// import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './authentication/error.interceptor';
import { JwtInterceptor } from './authentication/jwt.interceptor';
import { AuthGuard } from '../app/authentication/auth.guard';
import { ItemNotFoundComponent } from './Error/item-not-found/item-not-found.component';

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent, ItemNotFoundComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    SharedModule,
    LoginModule,
    OwlModule,
    HttpClientModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent],
  exports: [OwlModule, PipeModule, SharedModule],
  providers: [
    AuthGuard
  ],
  entryComponents: [LoginComponent, SignupComponent, ForgotPasswordComponent]
})
export class AppModule {}

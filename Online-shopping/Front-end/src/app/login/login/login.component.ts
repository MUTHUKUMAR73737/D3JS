import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {SignupComponent} from '../signup/signup.component';
import {ForgotPasswordComponent} from '../forgot-password/forgot-password.component';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { MessageService } from 'primeng/api';
import Swal from 'sweetalert2';
import { CustomerService } from 'src/app/service/customer.service';
import { AuthService } from 'src/app/authentication/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'e-shopping-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})

export class LoginComponent implements OnInit {

  constructor(
      private router: Router,
      private authenticationService: AuthService,
      private customerService: CustomerService,
      private messageService: MessageService,
      private formBuilder: FormBuilder,
      public dialog: MatDialog,
      public dialogRef: MatDialogRef<LoginComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    loginForm: FormGroup;
    loginResponse: any;

    ngOnInit() {
      this.loginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40),
          Validators.pattern('[a-zA-Z0-9.]+@[a-z]+.[a-z]{2,}|[9876]{1}[0-9]{9}')]],
        password: ['', [Validators.required,
          Validators.pattern('[A-Z]{1,}[a-zA-Z]{1,}[$#@]{1,}[0-9]{1,}')]]
      });
    }


     validateUsername() {
       if (this.loginForm.get('email').hasError('pattern')) {
         this.messageService.add({ severity: 'error', summary: 'Validation Error',
          detail: 'Please provide an valid user email'});
       } else if (this.loginForm.get('email').hasError('required')) {
        this.messageService.add({ severity: 'error', summary: 'Validation Error', detail: 'Email-ID or Phone number must be required'});
       }
     }

     validatePassword() {
       if (this.loginForm.get('password').hasError('pattern')) {
         this.messageService.add({ severity: 'error', summary: 'Validation Error',
         detail: 'Please provide an valid password - Eg(Muthu@123)'});
       } else if (this.loginForm.get('password').hasError('required')) {
        this.messageService.add({ severity: 'error', summary: 'Validation Error', detail: 'Password must be required'});
       }
     }

     goBack() {
       this.dialogRef.close();
     }

      getLogin() {

        // const user = new User();
        // user._userName = this.loginForm.get('username').value;
        // user._password = this.loginForm.get('password').value;
        // user._email = this.loginForm.get('username').value;
        // user._phone = this.loginForm.get('username').value;
        // user._role = 'user';

        this.customerService.getLogin(this.loginForm.value).subscribe(
          response => {
            this.loginResponse = response;
            if (this.loginResponse.message === 'success') {
              const toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
              });

              toast({
                type: 'success',
                title: 'Signed in successfully'
              });
              console.log(this.loginResponse);
              this.authenticationService.login(this.loginResponse.token, this.loginResponse.role,
                this.loginResponse.email, this.loginResponse.userName, this.loginResponse.userId, this.loginResponse.phone);
              this.dialogRef.close();
              // if (this.loginResponse.role === 'admin') {
              //   console.log('Inside Admin navigation');
              //   this.router.navigateByUrl('/admin');
              // } else if (this.loginResponse.role === 'user') {
              //   console.log('Inside user navigation');
              //   this.router.navigate(['/users/cart']);
              // } else if (this.loginResponse.role === 'superadmin') {
              //   this.router.navigate(['/superadmin']);
              // }
            } else if (this.loginResponse.message === 'Invalid-mail') {
              this.messageService.add({ severity: 'error', summary: 'Invalid Email ID',
                 detail: 'Please provide your valid email ID'});
            } else if (this.loginResponse.message === 'Invalid-password') {
              this.messageService.add({ severity: 'error', summary: 'Invalid Password',
              detail: 'Please provide your valid password'});
            } else {
              Swal('NO DATA FOUND', 'No Data Found with your details....Please SignUP and Login again', 'error');
            }
          }, error => {
            console.log('Error at login', error);
          }
        );
      }

      openDialogSignup(): void {
        const dialogRef = this.dialog.open(SignupComponent, {
          width: '500px', height: '510px', 'disableClose': true
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog signup Component was closed');
        });
      }

      openDialogForgotPassword(): void {
        const dialogRef = this.dialog.open(ForgotPasswordComponent, {
          width: '400px', height: '520px', 'disableClose': true
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog forgot password component was closed');
        });
      }
}

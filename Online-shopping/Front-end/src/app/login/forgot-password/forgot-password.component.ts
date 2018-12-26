import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { MessageService } from 'primeng/api';
import { CustomerService } from 'src/app/service/customer.service';
import {AbstractControl, ValidatorFn} from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'e-shopping-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  providers: [MessageService]
})

export class ForgotPasswordComponent implements OnInit {
 // ng model primeng key filter
  val: number;
  phoneNo: number;

  fpForm: FormGroup; // Forgot password email ID form
  fpOTPForm: FormGroup; // Forgot password OTP Form
  fpPasswordForm: FormGroup; // Forgot password - Change password form

  OTP: any; // Back end response
  currentOTP: string = ''; // otp
  resetPassword: Object; // Reset Password with identifier
  resetPasswordResponse: any; // change password response

  constructor(
    // private router: Router,
    private customerService: CustomerService,
    private messageService: MessageService,
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ForgotPasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  sendOTP() {
    this.customerService.sendOTP(this.fpForm.value).subscribe(
      response => {
        this.OTP = response;
        if (this.OTP.message === 'Invalid-mail') {
          this.messageService.add({ severity: 'error', summary: 'Email not found',
          detail: 'Please provide valid email !!!'});
          this.fpForm.setErrors({ 'invalid': true });
        } else if (this.OTP.message === 'Success') {
          if (this.OTP.otp) {
            console.log(console.log(this.OTP));
            this.currentOTP = this.OTP.otp.toString();
            console.log(this.currentOTP);
          }
        }
        this.fpOTPForm = this._formBuilder.group({
          otp: ['', [Validators.required, Validators.pattern('[0-9]{4}'), this.getOTPChecking.bind(this)]]
        });
      }, error => {
        console.log('Error at email OTP sending', error);
      }
    );
  }

  verifyOTP() {
    if (this.OTP === this.fpOTPForm.get('otp').value) {
      console.log('GOT');
    }
  }

  changePassword() {
    this.resetPassword  = {
        email: this.fpForm.get('email').value,
        password: this.fpPasswordForm.get('password').value
    };
      this.customerService.changePassword(this.resetPassword).subscribe(
        response => {
          this.resetPasswordResponse = response;
          if (this.resetPasswordResponse.message === 'success') {

            const toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000
            });
            toast({
              type: 'success',
              title: 'Password changed successfully'
            });
            // Swal('Change Password', 'Password changed successfully!', 'success');
            this.dialogRef.close();
          } else if (this.resetPasswordResponse.result === 'Failure') {
            Swal('Change Password', 'Error at Password changes!', 'error');
            this.fpForm.reset();
            this.fpOTPForm.reset();
            this.fpPasswordForm.reset();
          }
        }, error => {
          console.log('Error at Password reset', error);
        }
      );
  }


  goBack(): void {
    this.dialogRef.close();
  }

   ngOnInit() {
     this.fpForm = this._formBuilder.group({
       email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9.]+@[a-z.]+.{1}[a-z]{2,}')]]
     });
     this.fpOTPForm = this._formBuilder.group({
      otp: ['', [Validators.required, Validators.pattern('[0-9]{4}'), this.getOTPChecking.bind(this)]]
    });
     this.fpPasswordForm = this._formBuilder.group({
       password: ['', [Validators.required, Validators.pattern('[A-Z]{1,}[a-z]{1,}[$#@]{1,}[0-9]{1,}'), Validators.minLength(6),
        Validators.maxLength(16)]],
       confirmPassword: ['', Validators.required]
     }, {validator: this.checkMatchingPassword('password', 'confirmPassword')});
   }

    getOTPChecking(control: AbstractControl ): {[key: string]: Boolean} | null {
        if (control.value.length === 4 ) {
          if (control.value !== this.currentOTP) {
            return { validOTP: true };
          }
        }
        return null;
    }


    checkMatchingPassword(passwordKey: string, passwordConfirmationKey: string) {
      return (group: FormGroup) => {
        const passwordInput = group.controls[passwordKey], passwordConfirmationInput = group.controls[passwordConfirmationKey];
        if (passwordInput.value !== passwordConfirmationInput.value) {
          return passwordConfirmationInput.setErrors({notEquivalent: true});
        } else {
            return passwordConfirmationInput.setErrors(null);
        }
      };
    }

    validatePassword() {
      if (this.fpPasswordForm.get('password').hasError('required')) {
        this.messageService.add({ severity: 'error', summary: 'Validation Error', detail: 'Password must be required'});
      } else if (this.fpPasswordForm.get('confirmPassword').hasError('pattern')) {
        this.messageService.add({ severity: 'error', summary: 'Validation Error', detail: 'Password specification not met'});
      }
    }

    validateConfirmPassword() {
      if (this.fpPasswordForm.get('confirmPassword').hasError('required')) {
        this.messageService.add({ severity: 'error', summary: 'Validation Error', detail: 'Password must be required'});
      } else if (this.fpPasswordForm.get('confirmPassword').hasError('notEquivalent')) {
        this.messageService.add({ severity: 'error', summary: 'Validation Error', detail: 'Password mismatch'});
      }
    }

    validateOTP() {
      if (this.fpOTPForm.get('otp').hasError('pattern')) {
        this.messageService.add({ severity: 'error', summary: 'Validation Error',
        detail: 'OTP pattern !!!'});
      } else if (this.fpOTPForm.get('otp').hasError('validOTP')) {
        this.messageService.add({ severity: 'error', summary: 'Validation Error',
        detail: 'OTP mismatching'});
      } else  if (this.fpOTPForm.get('otp').hasError('required')) {
        this.messageService.add({ severity: 'error', summary: 'Validation Error',
        detail: 'OTP required!!!'});
      }
    }

    validateEmail() {
      if (this.fpForm.get('email').hasError('pattern')) {
        this.messageService.add({ severity: 'error', summary: 'Validation Error',
        detail: 'Email specification mismatch!!!!'});
      } else if (this.fpForm.get('email').hasError('required')) {
        this.messageService.add({ severity: 'error', summary: 'Validation Error',
        detail: 'Email must be required'});
      }
    }
}

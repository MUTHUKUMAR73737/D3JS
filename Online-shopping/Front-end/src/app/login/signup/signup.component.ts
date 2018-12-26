import { Component, OnInit, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import Swal from 'sweetalert2';
import { MessageService } from 'primeng/api';
import { CustomerService } from 'src/app/service/customer.service';


@Component({
  selector: 'e-shopping-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [MessageService]
})
export class SignupComponent implements OnInit {

      signupForm: FormGroup; // SignUp Form details
      // enableSignup: Boolean = false;
      signUpResponse: any; // Back-end response for signup activity
      currentOTP: string; // Received OTP
      OTP: any; //
      sendOTPRequest: Object; // Send OTP request object to back end
      signupFormSubmit: Object; // SignUp form submit

      constructor(
        private customerService: CustomerService,
        private messageService: MessageService,
        private formBuilder: FormBuilder,
        public dialog: MatDialog,
        public dialogRef: MatDialogRef<SignupComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
      ) { }

      ngOnInit() {
        this.signupForm = this.formBuilder.group({
          username: ['', [Validators.required, Validators.pattern('[A-Za-z]*'), Validators.minLength(3), Validators.maxLength(40)]],
          password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16),
            Validators.pattern('[A-Z]{1,}[a-z]{1,}[$#@]{1,}[0-9]{1,}')]],
          email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9.]+@[a-z.]+.{1}[a-z]{2,}')]],
          phone: ['', [Validators.required, Validators.pattern('[9876]{1}[0-9]{9}')]],
          confirmPassword: ['', Validators.required],
          otp: ['', [Validators.required, Validators.pattern('[0-9]{4}'), this.getOTPChecking.bind(this)]]
        }, {validator: this.checkMatchingPassword('password', 'confirmPassword')});
      }

        sendOTP() {
              this.sendOTPRequest = {
                  email: this.signupForm.get('email').value
              };
              this.customerService.registrationSendOTP(this.sendOTPRequest).subscribe(
                response => {
                  this.OTP = response;
                  if (this.OTP.message === 'Email-exist') {
                    this.messageService.add({ severity: 'success', summary:
                    'Email Already exist', detail:
                    'Please signup again with unique email or Go to Forgot password', sticky: true});
                    this.signupForm.reset();
                  } else if (this.OTP.message === 'Success') {
                    if (this.OTP) {
                      this.currentOTP = this.OTP.otp.toString();
                      console.log(this.currentOTP);
                    }
                    this.messageService.add({ severity: 'success', summary:
                    'Email verified', detail:
                    'Please check your email....We send OTP to you'});
                  } else if (this.OTP.message === 'Failure') {
                    this.messageService.add({ severity: 'success', summary:
                    'Email already exist', detail:
                    'Please email already exist or go to Forgot password'});
                  }
                  this.signupForm = this.formBuilder.group({
                    username: [this.signupForm.get('username').value,
                    [Validators.required, Validators.pattern('[A-Za-z]*'), Validators.minLength(3), Validators.maxLength(40)]],
                    password: [this.signupForm.get('password').value,
                    [Validators.required, Validators.minLength(6), Validators.maxLength(16),
                      Validators.pattern('[A-Z]{1,}[a-z]{1,}[$#@]{1,}[0-9]{1,}')]],
                    email: [this.signupForm.get('email').value,
                    [Validators.required, Validators.pattern('[a-zA-Z0-9.]+@[a-z.]+.{1}[a-z]{2,}')]],
                    phone: [this.signupForm.get('phone').value, [Validators.required, Validators.pattern('[9876]{1}[0-9]{9}')]],
                    confirmPassword: [this.signupForm.get('confirmPassword').value, Validators.required],
                    otp: ['', [Validators.required, Validators.pattern('[0-9]{4}'), this.getOTPChecking.bind(this)]]
                  }, {validator: this.checkMatchingPassword('password', 'confirmPassword')});
                }, error => {
                  this.messageService.add({ severity: 'error', summary:
                    'Email Not found', detail:
                    'Please check your mail ID'});
                  console.log('Error at email OTP sending', error);
                }
              );
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

        validateOTP() {
          if (this.signupForm.get('otp').hasError('pattern')) {
            this.messageService.add({ severity: 'error', summary: 'Validation Error',
            detail: 'OTP pattern !!!'});
          } else if (this.signupForm.get('otp').hasError('validOTP')) {
            this.messageService.add({ severity: 'error', summary: 'Validation Error',
            detail: 'OTP mismatching'});
          } else  if (this.signupForm.get('otp').hasError('required')) {
            this.messageService.add({ severity: 'error', summary: 'Validation Error',
            detail: 'OTP required!!!'});
          }
        }

        validateUsername() {
          if (this.signupForm.get('username').hasError('pattern')) {
            this.messageService.add({ severity: 'error', summary: 'Validation Error',
            detail: 'Invalid username - Username must contains alphabets'});
          }
        }

        validatePassword() {
          if (this.signupForm.get('password').hasError('required')) {
            this.messageService.add({ severity: 'error', summary: 'Validation Error', detail: 'Password must be required'});
          } else if (this.signupForm.get('password').hasError('pattern')) {
            this.messageService.add({ severity: 'error', summary: 'Validation Error', detail: 'Invalid password - Specification not met'});
          }
        }

        validateConfirmPassword() {
          if (this.signupForm.get('confirmPassword').hasError('notEquivalent')) {
            this.messageService.add({ severity: 'error', summary: 'Validation Error',
            detail: 'Confirm password mismatch with the password field'});
          } else  if (this.signupForm.get('confirmPassword').hasError('required')) {
             this.messageService.add({ severity: 'error', summary: 'Validation Error', detail: 'Confirm password must be required'});
           }
        }

        validatePhone() {
          if (this.signupForm.get('phone').hasError('pattern')) {
            this.messageService.add({ severity: 'error', summary: 'Validation Error',
            detail: 'Phone number must be 10 numerical digit.'});
          }  if (this.signupForm.get('phone').hasError('required')) {
            this.messageService.add({ severity: 'error', summary: 'Validation Error',
            detail: 'Phone number must be required'});
          }
        }

        validateEmail() {
          if (this.signupForm.get('email').hasError('pattern')) {
            this.messageService.add({ severity: 'error', summary: 'Validation Error',
            detail: 'Email specification mismatch!!!!'});
          } else if (this.signupForm.get('email').hasError('required')) {
            this.messageService.add({ severity: 'error', summary: 'Validation Error',
            detail: 'Email must be required'});
          }
        }


      getSignup() {
              this.signupFormSubmit = {
                username: this.signupForm.get('username').value,
                password: this.signupForm.get('password').value,
                email: this.signupForm.get('email').value,
                phone: this.signupForm.get('phone').value,
                role: 'user'
              };
                this.customerService.getRegistration(this.signupFormSubmit).subscribe(
                  (response) => {
                    this.signUpResponse = response;
                    if (this.signUpResponse.message === 'success') {
                      // Swal('Good', 'Please Login!', 'success');
                      const toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000
                      });

                      toast({
                        type: 'success',
                        title: 'You got an account....Please login'
                      });
                      this.dialogRef.close();
                    } else if (this.signUpResponse.message === 'failure') {
                      Swal('Error', 'Data already exist....Please provide unique email ID for registration', 'warning');
                      this.signupForm.reset();
                    }
                  }, error => {
                    console.log(error.errmsg);
                    console.log('Error at Signup - ' + error);
                    Swal('Error', 'Error from signup service', 'error');
                  }
                );
      }

      showResponse(response) {
        // this.messageService.add({severity: 'info', summary: 'Success', detail: 'User Responded'});
          // this.enableSignup = true;
          console.log(response);
      }

      goBack(): void {
        this.dialogRef.close();
      }
}

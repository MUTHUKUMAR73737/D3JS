import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { AdminService } from 'src/app/service/admin.service';
import { CustomerService } from '../../service/customer.service';
import Swal from 'sweetalert2';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'e-shopping-super-admin-home',
  templateUrl: './super-admin-home.component.html',
  styleUrls: ['./super-admin-home.component.css'],
  providers: [MessageService]
})
export class SuperAdminHomeComponent implements OnInit {
  items: MenuItem[];

  data: any;

  orderSummary = new Array();
  orderArray = new Array();
  deliveryArray = new Array();
  orderSummaryCount: any;
  customerCount: any;
  userCount: Number;
  adminCount: Number;
  countData: any;

  adminForm: FormGroup;

  // Admin CRUD
  cols: any[];
  newAdmin: Boolean;
  displayDialog: boolean;
  adminResponse: any;
  selectedAdmin: any;
  newCar: boolean;
  totalAdmin: any;
  enableDeleteButton: Boolean = false;

  registerObject: Object;

  constructor(
    private messageService: MessageService,
    private adminService: AdminService,
    private customerService: CustomerService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.initializeAdminForm();
    this.getAdminDetail();

    this.adminService.getCustomerCount().subscribe(
      response => {
        this.customerCount = response;
        this.userCount = this.customerCount[0].userCount;
        this.adminCount = this.customerCount[0].adminCount;

          this.countData = {
        labels: ['User', 'Admin'],
        datasets: [
            {
                data: [this.userCount, this.adminCount],
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB'
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB'
                ]
            }]
        };
      }, error => {
        console.log('Error at customer count');
      }
    );

    this.adminService.getOrderSummaryCount().subscribe(
      response => {
        this.orderSummaryCount = response;
      }
    );

    this.adminService.getOrderSummary().subscribe(
      response => {
        this.orderSummary = response;
        for (let i = 0; i < this.orderSummary.length; i++) {
          this.orderArray.push(this.orderSummary[i].purchasedCount);
          this.deliveryArray.push(this.orderSummary[i].deliveredCount);
        }

        this.data = {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [
            {
              label: 'Order',
              data: this.orderArray,
              fill: false,
              borderColor: '#4bc0c0'
            },
            {
              label: 'Delivery',
              data: this.deliveryArray,
              fill: false,
              borderColor: 'steelblue'
            }
          ]
        };
      },
      error => {
        console.log('Error at CHart');
      }
    );

    this.cols = [
      { field: 'username', header: 'Username' },
      { field: 'email', header: 'Email' },
      { field: 'phone', header: 'Phone' },
      { field: '_id', header: 'User ID' }
    ];
  }

  showDialogToAdd() {
    this.newAdmin = true;
    this.initializeAdminForm();
    this.displayDialog = true;
  }

  save() {
    if (this.newAdmin) {
      this.enableDeleteButton = false;
      this.registerObject = {
        username: this.adminForm.get('username').value,
        email: this.adminForm.get('email').value,
        phone: this.adminForm.get('phone').value,
        password: 'Onlineshopping@123',
        role: 'admin'
      };
      this.customerService
        .getRegistration(this.registerObject)
        .subscribe(response => {
          this.totalAdmin = response;
          if (this.totalAdmin.message === 'success') {
            this.getAdminDetail();
          } else {
            Swal('Error', 'Could not create admin', 'error');
          }
        });
    } else {
      this.enableDeleteButton = true;
      this.registerObject = {
        _id: this.selectedAdmin._id,
        username: this.adminForm.get('username').value,
        email: this.adminForm.get('email').value,
        phone: this.adminForm.get('phone').value,
        role: 'admin'
      };
      this.customerService
        .changeUserDetails(this.registerObject)
        .subscribe(response => {
          this.totalAdmin = response;
          if (this.totalAdmin.message === 'success') {
            this.getAdminDetail();
          } else {
            Swal('Error', 'Could not update admin', 'error');
          }
        });
    }
    this.initializeAdminForm();
    this.displayDialog = false;
  }

  delete() {
    this.registerObject = {
      _id: this.selectedAdmin._id
    };
    this.customerService.deleteUserDetail(this.registerObject).subscribe(
      response => {
        this.totalAdmin = response;
        if (this.totalAdmin.message === 'success') {
          this.getAdminDetail();
        }
      },
      error => {
        console.log('Admin user detail ERROR');
      }
    );
    this.initializeAdminForm();
    this.displayDialog = false;
  }

  getAdminDetail() {
    this.customerService.getAdminDetails().subscribe(response => {
      this.adminResponse = response;
      if (this.adminResponse.message === 'success') {
        this.adminResponse = response;
        this.totalAdmin = this.adminResponse.result;
      } else {
        Swal('Error', 'Admin not found!', 'error');
      }
    });
  }

  onRowSelect(event) {
    if (event) {
      this.newAdmin = false;
      this.adminForm = this.formBuilder.group({
        username: [ this.selectedAdmin.username,
          [ Validators.required, Validators.pattern('[A-Za-z]*'), Validators.minLength(3), Validators.maxLength(40)]],
        email: [this.selectedAdmin.email, [ Validators.required, Validators.pattern('[a-zA-Z0-9.]+@[a-z.]+.{1}[a-z]{2,}')]],
        phone: [this.selectedAdmin.phone, [Validators.required, Validators.pattern('[9876]{1}[0-9]{9}')]]
      });
      this.displayDialog = true;
    }
  }

  initializeAdminForm() {
    this.adminForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern('[A-Za-z]*'), Validators.minLength(3), Validators.maxLength(40)]],
      email: ['', [ Validators.required, Validators.pattern('[a-zA-Z0-9.]+@[a-z.]+.{1}[a-z]{2,}')]],
      phone: ['', [Validators.required, Validators.pattern('[9876]{1}[0-9]{9}')]]
    });
  }

  validateUsername() {
    if (this.adminForm.get('username').hasError('pattern')) {
      this.messageService.add({ severity: 'error', summary: 'Validation Error',
      detail: 'Invalid username - Username must contains alphabets'});
    } else if (this.adminForm.get('username').hasError('required')) {
      this.messageService.add({ severity: 'error', summary: 'Validation Error',
      detail: 'Username must be required'});
    }
  }

  validateEmail() {
    if (this.adminForm.get('email').hasError('pattern')) {
      this.messageService.add({ severity: 'error', summary: 'Validation Error',
      detail: 'Email specification mismatch!!!!'});
    } else if (this.adminForm.get('email').hasError('required')) {
      this.messageService.add({ severity: 'error', summary: 'Validation Error',
      detail: 'Email must be required'});
    }
  }

  validatePhone() {
    if (this.adminForm.get('phone').hasError('pattern')) {
      this.messageService.add({ severity: 'error', summary: 'Validation Error',
      detail: 'Phone number must be 10 numerical digit.'});
    }  if (this.adminForm.get('phone').hasError('required')) {
      this.messageService.add({ severity: 'error', summary: 'Validation Error',
      detail: 'Phone number must be required'});
    }
  }
}

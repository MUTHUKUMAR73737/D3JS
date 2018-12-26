import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { AdminService } from 'src/app/service/admin.service';
import Swal from 'sweetalert2';
import { MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'e-shopping-add-update-product',
  templateUrl: './add-update-product.component.html',
  styleUrls: ['./add-update-product.component.css'],
  providers: [MessageService]
})
export class AddUpdateProductComponent implements OnInit {
  productType: any[] = [
    { label: 'Mobile', value: 'mobile' },
    { label: 'Watch', value: 'Watches' },
    { label: 'Other', value: 'other' }
  ];

  selectionType: any[] = [
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' }
  ];

  watchDisplayType: any[] = [
    { label: 'Analog', value: 'Analog' },
    { label: 'Digital', value: 'Digital' }
  ];

  colorSelection: any[] = [
    { label: 'Black', value: 'Black' },
    { label: 'Green', value: 'Green' },
    { label: 'Red', value: 'Red' },
    { label: 'Blue', value: 'Blue' },
    { label: 'Yellow', value: 'Yellow' },
    { label: 'Violet', value: 'Violet' }
  ];

  addProductForm: FormGroup;
  mobileProductForm: FormGroup;
  watchProductForm: FormGroup;
  productImageForm: FormGroup;
  productOfferForm: FormGroup;
  sendProductForm: String = '';
  addProductResponse: any;
  selectedFile: File[] = [];

  enableMobileProductSpecification: Boolean = false;
  enableWatchProductSpecification: Boolean = false;

  enableAddOperation: Boolean = false;
  enableUpdateOperation: Boolean = false;
  operation: String = '';
  updateProductName: String = '';
  updateProductRequest: Object;
  updateProductResponse: any;
  updatedProductResponse: any;

  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {

    this.operation = this.route.snapshot.data['operation'];
     console.log(this.route.snapshot.data['operation']);
     /// Product registration
     if (this.operation === 'insert') {
      this.enableAddOperation = true;


      this.addProductForm = this.formBuilder.group({
        productName: ['', [Validators.required, Validators.minLength(5)]],
        productType: ['', [Validators.required]],
        productPrice: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(5), Validators.pattern('[0-9]*')]],
        productDiscount: ['', [Validators.required, Validators.pattern('[0-9]{1}')]],
        stock: ['', [Validators.required, Validators.maxLength(3), Validators.pattern('[0-9]*')]],
        productBrand: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
        productColor: ['', [Validators.required]],
        description: ['', [Validators.required]]
      });

      this.productImageForm = this.formBuilder.group({
        normalImage: ['', Validators.required],
        listImage: ['', Validators.required],
        leftViewImage: ['', Validators.required],
        rightViewImage: ['', Validators.required],
        backViewImage: ['', Validators.required],
        otherImage: ['', Validators.required]
      });

      this.productOfferForm = this.formBuilder.group({
        debitCard: ['', [Validators.required, Validators.pattern('[0-9]{1}')]],
        EMI: ['', [Validators.required, Validators.pattern('[0-9]{1}')]]
      });

      this.mobileProductForm = this.formBuilder.group({
        modelName: ['', Validators.required],
        modelNo: ['', Validators.required],
        SIMType: ['', Validators.required],
        box: ['', Validators.required],
        touchscreen: ['', Validators.required],
        hybridSIMSlot: ['', Validators.required],
        displaySize: ['', Validators.required],
        displayType: ['', Validators.required],
        displayResolution: ['', Validators.required],
        displayResolutionType: ['', Validators.required],
        os: ['', Validators.required],
        processor: ['', Validators.required],
        processorCore: ['', Validators.required],
        ROM: ['', Validators.required],
        RAM: ['', Validators.required],
        batteryCapacity: ['', Validators.required],
        expandableStorage: ['', Validators.required],
        supportedCard: ['', Validators.required],
        primaryCamera: ['', Validators.required],
        secondaryCamera: ['', Validators.required],
        secondaryCameraFeatures: ['', Validators.required],
        smartPhone: ['', Validators.required],
        SIMSize: ['', Validators.required],
        removableBattery: ['', Validators.required],
        graphicsPPI: ['', Validators.required],
        sensors: ['', Validators.required],
        others: ['', Validators.required]
      });

      this.watchProductForm = this.formBuilder.group({
        waterResistant: ['', Validators.required],
        displayType: ['', Validators.required],
        styleCode: ['', Validators.required],
        series: ['', Validators.required],
        occasion: ['', Validators.required],
        watchType: ['', Validators.required],
        calendar: ['', Validators.required],
        displayDate: ['', Validators.required],
        alarmClock: ['', Validators.required],
        box: ['', Validators.required],
        bodyStrapMaterial: ['', Validators.required],
        bodyStrapType: ['', Validators.required],
        waterResistanceDepth: ['', Validators.required],
        claspType: ['', Validators.required],
        dimensionsWidth: ['', Validators.required],
        dimensionsThickness: ['', Validators.required],
        dimensionsDiameter: ['', Validators.required],
        weight: ['', Validators.required],
        others: ['', Validators.required]
      });
      /// Product Update operation
     } else if ( this.operation === 'update') {
      this.enableAddOperation = false;
      this.enableUpdateOperation = true;

        this.route.params.subscribe(params => {
          this.updateProductName = params['productName'];
        });

        if (this.updateProductName !== '') {
          this.updateProductRequest = {
            admin: localStorage.getItem('userId'),
            productName: this.updateProductName
          };
          this.adminService.getAdminProduct(this.updateProductRequest).subscribe(
            response => {
              this.updateProductResponse = response;
            if (this.updateProductResponse.message === 'success') {
              this.updateProductResponse = this.updateProductResponse.result;
              console.log('Update response = ', this.updateProductResponse);

              this.addProductForm = this.formBuilder.group({
                productName: [ this.updateProductResponse.productName, [Validators.required, Validators.minLength(5)]],
                productType: [this.updateProductResponse.productType , [Validators.required]],
                productPrice: [this.updateProductResponse.productPrice , [Validators.required, Validators.maxLength(5),
                  Validators.pattern('[0-9]*'), Validators.minLength(2)]],
                productDiscount: [this.updateProductResponse.productDiscount, [Validators.required, Validators.pattern('[0-9]{1}')]],
                stock: [this.updateProductResponse.stock, [Validators.required, Validators.maxLength(3), Validators.pattern('[0-9]*')]],
                productBrand: [this.updateProductResponse.productBrand, [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
                productColor: [this.updateProductResponse.productColor, [Validators.required]],
                description: [this.updateProductResponse.description, [Validators.required]]
              });

              this.productOfferForm = this.formBuilder.group({
                debitCard: [this.updateProductResponse['offer']['debitCard'], [Validators.required, Validators.pattern('[0-9]{1}')]],
                EMI: [this.updateProductResponse['offer']['EMI'], [Validators.required, Validators.pattern('[0-9]{1}')]]
              });


              // this.productImageForm = this.formBuilder.group({
              //   normalImage: [this.updateProductResponse['imageLocation']['normal'], Validators.required],
              //   listImage: ['', Validators.required],
              //   leftViewImage: ['', Validators.required],
              //   rightViewImage: ['', Validators.required],
              //   backViewImage: ['', Validators.required],
              //   otherImage: ['', Validators.required]
              // });

              if (this.updateProductResponse.productType === 'mobile') {
                this.enableMobileProductSpecification = true;
                this.enableWatchProductSpecification = false;
                this.sendProductForm = 'mobile';
                this.mobileProductForm = this.formBuilder.group({
                  modelName: [this.updateProductResponse['specification']['modelName'], Validators.required],
                  modelNo: [this.updateProductResponse['specification']['modelNo'], Validators.required],
                  SIMType: [this.updateProductResponse['specification']['SIMType'], Validators.required],
                  box: [this.updateProductResponse['specification']['box'], Validators.required],
                  touchscreen: [this.updateProductResponse['specification']['touchscreen'], Validators.required],
                  hybridSIMSlot: [this.updateProductResponse['specification']['hybridSIMSlot'], Validators.required],
                  displaySize: [this.updateProductResponse['specification']['displaySize'], Validators.required],
                  displayType: [this.updateProductResponse['specification']['displayType'], Validators.required],
                  displayResolution: [this.updateProductResponse['specification']['displayResolution'], Validators.required],
                  displayResolutionType: [this.updateProductResponse['specification']['displayResolutionType'], Validators.required],
                  os: [this.updateProductResponse['specification']['os'], Validators.required],
                  processor: [this.updateProductResponse['specification']['processor'], Validators.required],
                  processorCore: [this.updateProductResponse['specification']['processorCore'], Validators.required],
                  ROM: [this.updateProductResponse['specification']['ROM'], Validators.required],
                  RAM: [this.updateProductResponse['specification']['RAM'], Validators.required],
                  batteryCapacity: [this.updateProductResponse['specification']['batteryCapacity'], Validators.required],
                  expandableStorage: [this.updateProductResponse['specification']['expandableStorage'], Validators.required],
                  supportedCard: [this.updateProductResponse['specification']['supportedCard'], Validators.required],
                  primaryCamera: [this.updateProductResponse['specification']['primaryCamera'], Validators.required],
                  secondaryCamera: [this.updateProductResponse['specification']['secondaryCamera'], Validators.required],
                  secondaryCameraFeatures: [this.updateProductResponse['specification']['secondaryCameraFeatures'], Validators.required],
                  smartPhone: [this.updateProductResponse['specification']['smartPhone'], Validators.required],
                  SIMSize: [this.updateProductResponse['specification']['SIMSize'], Validators.required],
                  removableBattery: [this.updateProductResponse['specification']['removableBattery'], Validators.required],
                  graphicsPPI: [this.updateProductResponse['specification']['graphicsPPI'], Validators.required],
                  sensors: [this.updateProductResponse['specification']['sensors'], Validators.required],
                  others: [this.updateProductResponse['specification']['others'], Validators.required]
                });

              } else if (this.updateProductResponse.productType === 'Watches') {
                this.enableMobileProductSpecification = false;
                this.enableWatchProductSpecification = true;
                this.sendProductForm = 'Watches';
                this.watchProductForm = this.formBuilder.group({
                  waterResistant: [this.updateProductResponse['specification']['waterResistant'], Validators.required],
                  displayType: [ this.updateProductResponse['specification']['displayType'], Validators.required],
                  styleCode: [this.updateProductResponse['specification']['styleCode'], Validators.required],
                  series: [this.updateProductResponse['specification']['series'], Validators.required],
                  occasion: [this.updateProductResponse['specification']['occasion'], Validators.required],
                  watchType: [this.updateProductResponse['specification']['watchType'], Validators.required],
                  calendar: [this.updateProductResponse['specification']['calendar'], Validators.required],
                  displayDate: [this.updateProductResponse['specification']['displayDate'], Validators.required],
                  alarmClock: [this.updateProductResponse['specification']['alarmClock'], Validators.required],
                  box: [this.updateProductResponse['specification']['box'], Validators.required],
                  bodyStrapMaterial: [this.updateProductResponse['specification']['bodyStrapMaterial'], Validators.required],
                  bodyStrapType: [this.updateProductResponse['specification']['bodyStrapType'], Validators.required],
                  waterResistanceDepth: [this.updateProductResponse['specification']['waterResistanceDepth'], Validators.required],
                  claspType: [this.updateProductResponse['specification']['claspType'], Validators.required],
                  dimensionsWidth: [this.updateProductResponse['specification']['dimensionsWidth'], Validators.required],
                  dimensionsThickness: [this.updateProductResponse['specification']['dimensionsThickness'], Validators.required],
                  dimensionsDiameter: [this.updateProductResponse['specification']['dimensionsDiameter'], Validators.required],
                  weight: [this.updateProductResponse['specification']['weight'], Validators.required],
                  others: [this.updateProductResponse['specification']['others'], Validators.required]
                });
              }


            } else if (this.updateProductResponse.message === 'failure') {
              this.updateProductResponse = null;
              alert('Item not found');
            }
            }
          );
        }

        this.addProductForm = this.formBuilder.group({
          productName: ['', [Validators.required, Validators.minLength(5)]],
          productType: ['', [Validators.required]],
          productPrice: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(5), Validators.pattern('[0-9]*')]],
          productDiscount: ['', [Validators.required, Validators.pattern('[0-9]{1}')]],
          stock: ['', [Validators.required, Validators.maxLength(3), Validators.pattern('[0-9]*')]],
          productBrand: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
          productColor: ['', [Validators.required]],
          description: ['', [Validators.required]]
        });


      // this.productImageForm = this.formBuilder.group({
      //   normalImage: ['', Validators.required],
      //   listImage: ['', Validators.required],
      //   leftViewImage: ['', Validators.required],
      //   rightViewImage: ['', Validators.required],
      //   backViewImage: ['', Validators.required],
      //   otherImage: ['', Validators.required]
      // });

      this.productOfferForm = this.formBuilder.group({
        debitCard: ['', [Validators.required, Validators.pattern('[0-9]{1}')]],
        EMI: ['', [Validators.required, Validators.pattern('[0-9]{1}')]]
      });

      this.mobileProductForm = this.formBuilder.group({
        modelName: ['', Validators.required],
        modelNo: ['', Validators.required],
        SIMType: ['', Validators.required],
        box: ['', Validators.required],
        touchscreen: ['', Validators.required],
        hybridSIMSlot: ['', Validators.required],
        displaySize: ['', Validators.required],
        displayType: ['', Validators.required],
        displayResolution: ['', Validators.required],
        displayResolutionType: ['', Validators.required],
        os: ['', Validators.required],
        processor: ['', Validators.required],
        processorCore: ['', Validators.required],
        ROM: ['', Validators.required],
        RAM: ['', Validators.required],
        batteryCapacity: ['', Validators.required],
        expandableStorage: ['', Validators.required],
        supportedCard: ['', Validators.required],
        primaryCamera: ['', Validators.required],
        secondaryCamera: ['', Validators.required],
        secondaryCameraFeatures: ['', Validators.required],
        smartPhone: ['', Validators.required],
        SIMSize: ['', Validators.required],
        removableBattery: ['', Validators.required],
        graphicsPPI: ['', Validators.required],
        sensors: ['', Validators.required],
        others: ['', Validators.required]
      });

      this.watchProductForm = this.formBuilder.group({
        waterResistant: ['', Validators.required],
        displayType: ['', Validators.required],
        styleCode: ['', Validators.required],
        series: ['', Validators.required],
        occasion: ['', Validators.required],
        watchType: ['', Validators.required],
        calendar: ['', Validators.required],
        displayDate: ['', Validators.required],
        alarmClock: ['', Validators.required],
        box: ['', Validators.required],
        bodyStrapMaterial: ['', Validators.required],
        bodyStrapType: ['', Validators.required],
        waterResistanceDepth: ['', Validators.required],
        claspType: ['', Validators.required],
        dimensionsWidth: ['', Validators.required],
        dimensionsThickness: ['', Validators.required],
        dimensionsDiameter: ['', Validators.required],
        weight: ['', Validators.required],
        others: ['', Validators.required]
      });
     }


  }

  selectSpecification(event) {
    if (event.value === 'mobile') {
      this.enableMobileProductSpecification = true;
      this.enableWatchProductSpecification = false;
      this.sendProductForm = event.value;
      console.log('Inside mobile');
    } else if (event.value === 'Watches') {
      this.enableMobileProductSpecification = false;
      this.enableWatchProductSpecification = true;
      this.sendProductForm = event.value;
      console.log('Inside watch type');
    } else if (event.value === 'other') {
      this.enableMobileProductSpecification = false;
      this.enableWatchProductSpecification = false;
      this.sendProductForm = event.value;
    }
  }


  sendProduct() {
    if (this.operation === 'insert') {
      if (this.sendProductForm === 'mobile') {
        this.adminService
        .getProductRegistration(this.addProductForm.value, this.selectedFile, this.mobileProductForm.value, this.productOfferForm.value)
        .subscribe(
          response => {
            this.addProductResponse = response;
            if (this.addProductResponse.message === 'success') {
              const toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
              });
              toast({
                type: 'success',
                title: 'Your new product is created successfully'
              });
              this.resetForm1();
              this.router.navigate(['/admin']);
              // Swal('Success', 'Product created successfully', 'success');
            } else if (this.addProductResponse.message === 'failure') {
              Swal('Failure', 'Error at product creation', 'error');
            } else if (this.addProductResponse.message === 'product-exist') {
              this.messageService.add({ severity: 'error', summary: 'Product Exist',
              detail: 'This product is already exist...Please insert product with unique name'});
            }
            console.log('response = ', response);
          },
          error => {
            console.log('error = ', error);
          }
        );
      } else  if (this.sendProductForm === 'Watches') {
        this.adminService
        .getProductRegistration(this.addProductForm.value, this.selectedFile, this.watchProductForm.value, this.productOfferForm.value)
        .subscribe(
          response => {
            this.addProductResponse = response;
            if (this.addProductResponse.message === 'success') {
              const toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
              });

              toast({
                type: 'success',
                title: 'Your Product created successfully'
              });
              this.resetForm1();
              this.router.navigate(['/admin']);
            } else if (this.addProductResponse.message === 'failure') {
              Swal('Failure', 'Error at product creation', 'error');
            } else if (this.addProductResponse.message === 'product-exist') {
              this.messageService.add({ severity: 'error', summary: 'Product Exist',
              detail: 'This product is already exist...Please insert product with unique name'});
            }
            console.log('response = ', response);
          },
          error => {
            console.log('error = ', error);
          }
        );
      }
    }
    if (this.operation === 'update') {
      if (this.sendProductForm === 'mobile') {
        this.adminService
        .updateProduct(this.addProductForm.value, this.mobileProductForm.value, this.productOfferForm.value)
        .subscribe(
          response => {
           this.updatedProductResponse = response;
           if (this.updatedProductResponse.message === 'success') {
            const toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000
            });

            toast({
              type: 'success',
              title: 'Your Product has been updated successfully'
            });
            this.resetForm1();
              this.router.navigate(['/admin']);
           } else if (this.updatedProductResponse.message === 'failure') {
            Swal('Failure', 'Error at product update', 'error');
          }
            console.log('response = ', response);
          },
          error => {
            console.log('error = ', error);
          }
        );
      } else  if (this.sendProductForm === 'Watches') {
        this.adminService
        .updateProduct(this.addProductForm.value, this.watchProductForm.value, this.productOfferForm.value)
        .subscribe(
          response => {
            this.updatedProductResponse = response;
            if (this.updatedProductResponse.message === 'success') {
              const toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
              });

              toast({
                type: 'success',
                title: 'Your Product has been updated successfully'
              });
              this.resetForm1();
              this.router.navigate(['/admin']);
            } else if (this.updatedProductResponse.message === 'failure') {
              Swal('Failure', 'Error at product update', 'error');
           }
             console.log('response = ', response);
           },
           error => {
             console.log('error = ', error);
           }
        );
      }
    }
  }

  onFileChanged(event) {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile.push(event.target.files[0]);
    }
  }

  resetForm() {
    this.addProductForm.reset();
    this.productImageForm.reset();
    this.mobileProductForm.reset();
    this.watchProductForm.reset();
    this.productOfferForm.reset();
    this.sendProductForm = 'Other';
  }

  resetForm1() {
    this.addProductForm.reset();
    this.mobileProductForm.reset();
    this.watchProductForm.reset();
    this.productOfferForm.reset();
  }


  validateProductName() {

  }
}

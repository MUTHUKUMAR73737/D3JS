import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperAdminHomeComponent } from './super-admin-home/super-admin-home.component';
import { AddUpdateAdminComponent } from './add-update-admin/add-update-admin.component';
import { DeleteAdminComponent } from './delete-admin/delete-admin.component';
import { ViewAdminComponent } from './view-admin/view-admin.component';
import { MenuModule } from 'primeng/menu';
import { InputTextModule } from 'primeng/inputtext';

import { SuperAdminRoutingModule } from './super-admin-routing.module';
import { ChartModule, ButtonModule, TooltipModule, InputMaskModule } from 'primeng/primeng';
import { DataTableModule, SharedModule } from 'primeng/primeng';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import {DialogModule} from 'primeng/dialog';
import {TableModule} from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [
    SuperAdminHomeComponent,
    AddUpdateAdminComponent,
    DeleteAdminComponent,
    ViewAdminComponent
  ],
  imports: [
    CommonModule,
    MenuModule,
    FormsModule,
    ReactiveFormsModule,
    DynamicDialogModule,
    TableModule,
    TooltipModule,
    ToastModule,
    InputMaskModule,
    DialogModule,
    ButtonModule,
    DataTableModule,
    SharedModule,
    InputTextModule,
    ChartModule,
    SuperAdminRoutingModule
  ],
  exports: [
    SuperAdminHomeComponent,
    AddUpdateAdminComponent,
    DeleteAdminComponent,
    ViewAdminComponent
  ]
})
export class SuperAdminModule {}

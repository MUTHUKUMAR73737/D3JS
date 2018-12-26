import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './shared/home/home.component';
import { PageNotFoundComponent } from './Error/page-not-found/page-not-found.component';
import { ProductListComponent } from './shared/product-list/product-list.component';
import { DescriptionComponent } from './shared/description/description.component';
import { AuthGuard } from './authentication/auth.guard';
import { ProductComparisonComponent } from './shared/product-comparison/product-comparison.component';
import { PlaceOrderComponent } from './user/place-order/place-order.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'productList/:productType', component: ProductListComponent },
  {
    path: 'productDescription/:productName',
    component: DescriptionComponent
  },
  { path: 'productCompare', component: ProductComparisonComponent },
  {
    path: 'users',
    canLoad: [AuthGuard],
    loadChildren: './user/user.module#UserModule',
    data: {role: 'user'}
  },
  {
    path: 'admin',
    canLoad: [AuthGuard],
    loadChildren: './admin/admin.module#AdminModule',
    data: {role: 'admin'}
  },
  {
    path: 'superadmin',
    canLoad: [AuthGuard],
    loadChildren: './superAdmin/super-admin.module#SuperAdminModule',
    data: {role: 'superAdmin'}
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {}

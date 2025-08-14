import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsListComponent } from './products/components/products-list/products-list.component';
import { AddProductsComponent } from './products/components/add-products/add-products.component';
import { CanDeactivateGuard } from './shared/services/can-deactivate.guard';

const routes: Routes = [
  { path: '', redirectTo: '/product-list', pathMatch: 'full' },
  { path: 'product-list', component: ProductsListComponent },
  { path: 'add-products', component: AddProductsComponent, canDeactivate: [CanDeactivateGuard] },
  { path: 'add-products/:data/:id', component: AddProductsComponent, canDeactivate: [CanDeactivateGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

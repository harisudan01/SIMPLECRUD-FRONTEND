import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { AddProductsComponent } from './components/add-products/add-products.component';
import { CustomDatePipe } from './pipe/custom-date.pipe';
import { CurrencyFormatPipe } from './pipe/currency-format.pipe';
import { SharedModule } from '../shared/shared.module';
import { TablestyleDirective } from './directives/tablestyle.directive';



@NgModule({
  declarations: [
    ProductsListComponent,
    AddProductsComponent,
    CustomDatePipe,
    CurrencyFormatPipe,
    TablestyleDirective,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule
  ],
  providers: [CurrencyPipe],
})
export class ProductsModule { }

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpRoutingService } from 'src/app/shared/services/http-routing.service';
import {ProductData, ProductDeleteDetails, ProductForm, ProductResponse, ProductStatus,} from '../models/models';
/**
 * Products Service
 */
@Injectable({
  providedIn: 'root'
})
export class ProductService {
/**
 * 
 * @param http Inject Http Routing Service
 */
  constructor(private http:HttpRoutingService) { }
  /**
   * Get All Products
   * @returns 
   */
  getAllProducts():Observable<ProductData>{
    return this.http.getAllMethod();
  }
  /**
   * Delete Product
   * @param data product Id
   * @returns 
   */
  deleteProduct(data:number):Observable<ProductDeleteDetails>{
    console.log('data',data);
    return this.http.deletemethod(data);
  }
  /**
   * Create Product
   * @param data Product Form
   * @returns 
   */
  createProduct(data:ProductForm):Observable<ProductResponse>{
    return this.http.postmethod(data);
  }
  /**
   * Get One Product
   * @param id Product Id
   * @returns 
   */
  getOneProduct(id:number): Observable<ProductResponse>{
     return this.http.getOneMethod(id)
  }
  /**
   * Update Product
   * @param product Product Form
   * @param id Product Id
   * @returns 
   */
 updateProduct(product: ProductForm,id:number): Observable<ProductStatus> {
  console.log('Product',product);
    return this.http.putmethod(product,id);
  }
}

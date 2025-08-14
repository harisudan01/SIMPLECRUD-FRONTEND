import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductData, ProductDeleteDetails, ProductForm, ProductResponse, ProductStatus} from 'src/app/products/models/models';
import { environment } from 'src/environments/environment';
/**
 * Http Routing Service
 */
@Injectable({
  providedIn: 'root'
})
export class HttpRoutingService {
 
  apiUrl=environment.apiurl;
  /**
   * 
   * @param httpService Import HttpClient
   */
  constructor(private httpService:HttpClient) { }
  /**
   * Method used to get All Product
   * @returns 
   */
  getAllMethod(){
    console.log(this.apiUrl)
    return this.httpService.get<ProductData>(this.apiUrl+'v1/product');
  }
  /**
   * Method used to Delete Product
   * @param data product Id
   * @returns 
   */
  deletemethod(data:number){
    return this.httpService.delete<ProductDeleteDetails>(this.apiUrl+`v1/product/${data}`)
  }
  /**
   * Method used to create product
   * @param data ProductForm
   * @returns 
   */
  postmethod(data:ProductForm){
    return this.httpService.post<ProductResponse>(this.apiUrl+'v1/product',data)
  }
  /**
   * Method used to get one Product
   * @param id Product Id
   * @returns 
   */
  getOneMethod(id:number){
    return this.httpService.get<ProductResponse>(this.apiUrl+`v1/product/${id}`)
  }
  /**
   * Method used to update Product
   * @param data Product Data
   * @param id Product Id
   * @returns 
   */
  putmethod(data:ProductForm,id:number){
    return this.httpService.put<ProductStatus>(this.apiUrl+`v1/product?id=${id}`,data)
  }
}

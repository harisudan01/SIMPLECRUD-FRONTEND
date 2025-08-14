export interface ProductDetails {
  id: number;
  name: string;
  description: string;
  price: number;
  createdDate: string;
  modified:string;
  isDeleted: boolean;
}
export interface ProductResponse {
  productDetails: ProductDetails;
}
export  interface RouteParams {
  data?: string;
  id: number;
}
export interface ProductUpdateDetails{
  success:boolean;
  updateStatus:boolean
}
export interface ProductStatus{
  updateStatus: boolean
}
export interface ProductForm{
  description:string;
  name:string;
  price:number
}
export interface TableColumn {
  key: string;
  label: string;
}
export interface ElementData {
  id: number;
  name: string;
  description: string | null;
  price: number;
  isDeleted: boolean;
  createdDate: string;
  modified: string;
}
export interface ProductData{
  productList:{
    rows:ElementData[]
  }
}
export interface ProductDeleteDetails{
  deleteStatus:boolean,
  success:boolean
}

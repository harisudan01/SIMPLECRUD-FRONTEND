/**
 * Component which is used display Add Products
 */
import { Component, Inject, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { SnackType } from 'src/app/shared/models/model';
import { ProductDetails, ProductResponse, ProductStatus, RouteParams } from '../../models/models';
import { ProductConstants } from '../../constants/product-constants';
import { Subscription, mergeMap } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

/**
 * Component which is used Add products
 */
@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.scss']
})
export class AddProductsComponent extends ProductConstants {
  /**
    * Component constructor to inject the required services.
    * @param productsService this service is used for get operations for products
    * @param router this service is used for page navigation
    * @param dialog this service is used for dialog box display
    * @param dialogService this service is used for dialog box display.
    * @param snackbar this service is used to display snack bar.
    */
  constructor(private route: ActivatedRoute,
     private productService: ProductService, private snackbar: SnackbarService, private dialogRef: MatDialogRef<AddProductsComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: { id: number,mode:string }) {
    super();
  }
  /**
   * productForm used to assign add product type form.
   * @type FormGroup
   */
  productForm!: FormGroup;
  /**
   * productDetails uses to store the getone Product Details
   */
  productDetails!: ProductDetails;
  /**
   * Update boolean for differentiate add and edit
   * @type boolean
   */
  update: boolean = false;
  /**
   * name used to display Heading
   * @type string
   */
  name: string = this.constantData.addProduct;
  /**
   * button disabled at view
   * @type boolean
   */
  isButtonDisabled: boolean = false;
  /**
   * paramData object used to store id and data
   * @type object
   */
  paramData!: RouteParams;
  /**
 * subscription object.
 * @type {Subscription}
 */
  subscriptionObject: Subscription = new Subscription();
  /**
     * Component OnInit life cycle hook
     */
  ngOnInit(): void {
    if (this.dialogData?.id) {
      this.update = true;
      this.paramData = { id: this.dialogData.id,data:this.dialogData.mode };

      this.productService.getOneProduct(this.dialogData.id).subscribe({
        next: (response: ProductResponse) => {
          this.productDetails = response.productDetails;
          this.formIntialize();
          if (this.paramData.data === this.constantData.edit) {
            this.name = this.constantData.editProduct;
            this.isButtonDisabled = false;
          }
          if (this.paramData.data === this.constantData.view) {
            this.name = this.constantData.viewProduct;
            this.productForm.disable();
            this.isButtonDisabled = true;
          }
        },
        error: () => { }
      });
    } else {
      this.formIntialize();
    }
  }

  /**
   * Method  used to call form Initilaise
   */
  formIntialize(): void {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0]
    this.productForm = new FormGroup({
      name: new FormControl(this.productDetails && this.productDetails.name ? this.productDetails.name : null, [Validators.required,Validators.maxLength(40)]),
      description: new FormControl(this.productDetails && this.productDetails.description ? this.productDetails.description : null, [Validators.maxLength(150)]),
      price: new FormControl(this.productDetails && this.productDetails.price ? this.productDetails.price : null, [Validators.required, Validators.max(1000000)]),
      createdDate:new FormControl(this.productDetails&& this.productDetails.createdDate ?this.productDetails.createdDate:formattedDate)

    })
  }
  /**
   * Method used to save and Update Product
   */
  onSave():void {
    if (this.productForm.valid) {
      if (!this.update) {
        this.createProduct();
      }
      else {
        this.updateProduct();
      }
    }
    else {
      this.snackbar.openSnackBar({ message: this.snackbarmessages?.mandatoryField, snacktype: SnackType.Error });
    }
  }
  /**
   * Method used to create Product
   */
  createProduct():void {
    this.subscriptionObject.add(this.productService.createProduct(this.productForm.value).subscribe({
      next: (res: ProductResponse) => {
        if (res) {
          this.productForm.markAsPristine();
          this.snackbar.openSnackBar({ message: this.snackbarmessages?.productCreationSuccess, snacktype: SnackType.Success });
          // this.onBack();
          this.dialogRef.close('saved')
        }
        else {
          this.snackbar.openSnackBar({ message: this.snackbarmessages?.pleaseTryAgain, snacktype: SnackType.Error });
        }
      }, error: () => {
        this.snackbar.openSnackBar({ message: this.snackbarmessages?.pleaseTryAgain, snacktype: SnackType.Error });
      }
    }))
  }
  /**
   * Method used to update Product
   */
  updateProduct():void {
    this.subscriptionObject.add(this.productService.updateProduct(this.productForm.value, +this.paramData.id).subscribe({
      next: (response: ProductStatus) => {
        console.log('update',response);
        if (response.updateStatus) {
          if (!this.productForm.dirty) {
            this.snackbar.openSnackBar({ message: this.snackbarmessages?.noUpdate, snacktype: SnackType.Info });
          }
          else {
            this.productForm.markAsPristine();
            this.snackbar.openSnackBar({ message: this.snackbarmessages?.productUpdation, snacktype: SnackType.Success });
            // this.onBack();
            this.dialogRef.close('saved')
          }
        }
        else {
          this.snackbar.openSnackBar({ message: this.snackbarmessages?.pleaseTryAgain, snacktype: SnackType.Error });
        }
      }, error: () => {
        this.snackbar.openSnackBar({ message: this.snackbarmessages?.pleaseTryAgain, snacktype: SnackType.Error });
      }
    }))
  }
  /**
   * Method used to call back
   */
  onBack():void {
    if(!this.productForm.dirty){
    this.dialogRef.close();
    }
    else {
      const confirmLeave = confirm('You have unsaved changes. Do you really want to discard them?');
      if (confirmLeave) {
        this.dialogRef.close();
      }
    }

  }
  /**
   * Method used to return boolean when form is dirty
   * @returns boolean
   */
  canDeactivate(): boolean {
    return this.productForm ? !this.productForm.dirty : true;
  }
  /**
   *  Angular lifecycle hook that is called when the component is destroyed.
   *  This method ensures that any subscriptions are properly unsubscribed to
   *  avoid memory leaks. 
   */ 
  ngOnDestroy():void {
    // Unsubscribe from the subscription to prevent memory leaks
    this.subscriptionObject.unsubscribe();
  }
}

/**
 * Component used to Show the Products List
 */
import { Component, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { SnackType } from 'src/app/shared/models/model';
import { EMPTY, Subscription, filter, mergeMap } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ElementData, ProductData, ProductDeleteDetails, ProductDetails, ProductResponse, ProductStatus, TableColumn } from '../../models/models';
import { ProductConstants } from '../../constants/product-constants';
import { AddProductsComponent } from '../add-products/add-products.component';
/**
 * Component used to Show the Products List
 */

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent extends ProductConstants implements OnInit {
  /**
     * Component constructor to inject the required services.
     * @param productsService this service is used for get operations for products
     * @param router this service is used for page navigation
     * @param openDialog this is used for dialog box display
     * @param dialogService this service is used for dialog box display.
     * @param snackbar this service is used to display snack bar.
     */
  constructor(private productService: ProductService, private dialogService: DialogService, private snackBar: SnackbarService, private router: Router, private openDialog: MatDialog,private vcr:ViewContainerRef) {
    super()
  }
  /**
 * subscription object.
 * @type {Subscription}
 */
  subscriptionObject: Subscription = new Subscription();
  /**
   * Use MatDialog for Open Component
   */
  dialogRef!: MatDialogRef<any>;
  /**
   * 
   */
  /**
   * Displayed Columns
   * @type array
   */
  displayedColumns: TableColumn[] = [
    { key: 'Name', label: 'Name' },
    { key: 'Description', label: 'Description' },
    { key: 'Price', label: 'Price' },
    { key: 'Created Date', label: 'Created Date' },
    { key: 'Action', label: 'Action' }
  ];
  /**
  * Used to show Headers
  */
  displayedColumnKeys: string[] = this.displayedColumns.map(column => column.key);
  /**
    * Element Data to store all products data
  */
  ELEMENT_DATA: ElementData[] = [];
  /**
   * Data to show in Table
   */
  data = new MatTableDataSource<ElementData>;
  /**
   * ViewChild decorator to access MatPaginator
   */
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  /**
   * ViewChild decorator to access Quick Update
   */
  @ViewChild('quickupdate', { static: true }) quickupdate!: TemplateRef<any>;
  /**
   * productForm used to assign add product type form.
   * @type FormGroup
   */
  productForm!: FormGroup;
  /**
   * productDetails to store get One Product Values
   */
  productDetails!: ProductDetails;
  /**
     * Component OnInit life cycle hook
     */
  ngOnInit(): void {
    this.formIntialise()
    this.getAllProducts();
  }
  /**
   * Component After ViewInit Life Cycle Hooks
   */
  ngAfterViewInit(): void {
    this.data.paginator = this.paginator;
  }
  /**
   * Method used for Edit Product Page
   * @param element 
   */
  onEdit(element: ElementData): void {
    const dialogRef = this.openDialog.open(AddProductsComponent, {
      width: '600px',
      data: { id:element.id ,mode:'edit' }
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log('ddfdf', result)
      if (result === 'saved') { 
        this.getAllProducts();
      }
    });
  }
  /**
   * Method used for View Product Page
   * @param element 
   */
  onView(element: ElementData): void {
    this.openDialog.open(AddProductsComponent, {
      width: '600px',
      data: { id: element.id, mode: 'view' }
    })
  }
  /**
   * Method used to get All Products
   */
  getAllProducts(): void {
    this.subscriptionObject.add(this.productService.getAllProducts().subscribe({
      next: (res: ProductData) => {
        if (res) {
          this.ELEMENT_DATA = res.productList.rows;
          this.data = new MatTableDataSource<any>(this.ELEMENT_DATA);
          console.log('d',this.data);
          this.data.paginator = this.paginator;
        }
      },
      error: () => {
        this.snackBar.openSnackBar({ message: this.snackbarmessages?.pleaseTryAgain, snacktype: SnackType.Error });
      }
    }))
  }
  /**
   * Method used to call Form
   */
  formIntialise(): void {
    this.productForm = new FormGroup({
      name: new FormControl(this.productDetails && this.productDetails.name ? this.productDetails.name : null, [Validators.required, Validators.pattern('[a-zA-Z0-9 ]*'), Validators.maxLength(40)]),
      description: new FormControl(this.productDetails && this.productDetails.description ? this.productDetails.description : null),
      price: new FormControl(this.productDetails && this.productDetails.price ? this.productDetails.price : null),
    })
  }
  /**
   * Method used to delete data
   * @param element 
   */
  onDelete(element: ElementData): void {
    const dialogRef = this.dialogService.openConfirmationDialog(this.dialogMessages?.deleteProduct, this.dialogMessages?.confirmation);
    this.subscriptionObject.add(
      dialogRef.afterClosed().pipe(
        mergeMap(response => {
          if (response) {
            return this.productService.deleteProduct(element.id);
          } else {
            return EMPTY;
          }
        })
      ).subscribe({
        next:
          (res: ProductDeleteDetails) => {
            if (res.deleteStatus) {
              this.ELEMENT_DATA = this.ELEMENT_DATA.filter((product: { id: number }) => product.id !== element.id);
              this.data = new MatTableDataSource(this.ELEMENT_DATA);
              this.data.paginator = this.paginator;
              this.snackBar.openSnackBar({ message: this.snackbarmessages?.deleteProductSuccess, snacktype: SnackType.Success });
            } else {
              this.snackBar.openSnackBar({ message: this.snackbarmessages?.failedProduct, snacktype: SnackType.Success });
            }
          },
        error: () => {
          this.snackBar.openSnackBar({ message: this.snackbarmessages?.failedProduct, snacktype: SnackType.Success });
        }
      }
      )
    );
  }
  /**
   * Method used to call add Product
   */
  addproduct(): void {
    // this.vcr.createComponent()
    const dialogRef = this.openDialog.open(AddProductsComponent,{
      width: '600px',
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log('ddfdf',result)
      if (result === 'saved') {  // only refresh if saved
        this.getAllProducts();
      }
    });
  }
  /**
   * Method used to call Quick Update
   * @param element 
   */
  quickUpdate(element: ElementData): void {
    this.subscriptionObject.add(this.productService.getOneProduct(element.id).subscribe({
      next: (response: ProductResponse) => {
        if (response) {
          this.productDetails = response.productDetails;
          this.formIntialise();
        }
        else {
          this.snackBar.openSnackBar({ message: this.snackbarmessages?.pleaseTryAgain, snacktype: SnackType.Error });
        }
      },
      error: () => {
        this.snackBar.openSnackBar({ message: this.snackbarmessages?.pleaseTryAgain, snacktype: SnackType.Error });
      }
    }))
    this.openDialog.open(this.quickupdate, {
      autoFocus: false,
      width: '400px'
    });
  }
  /**
   * Method used to Update the Product
   */
  update(): void {
    if (this.productForm.valid) {
      this.subscriptionObject.add(this.productService.updateProduct(this.productForm.value, this.productDetails.id).subscribe({
        next: (response: ProductStatus) => {
          if (response) {
            if (!this.productForm.dirty) {
              this.snackBar.openSnackBar({ message: this.snackbarmessages?.noUpdate, snacktype: SnackType.Info });
            }
            else {
              this.productForm.markAsPristine();
              this.snackBar.openSnackBar({ message: this.snackbarmessages?.productUpdation, snacktype: SnackType.Success });
              this.getAllProducts();
              this.openDialog.closeAll();
            }
          }
        },
        error: () => {
          this.snackBar.openSnackBar({ message: this.snackbarmessages?.productUpdationError, snacktype: SnackType.Error });
        }
      }))
    }
    else {
      this.snackBar.openSnackBar({ message: this.snackbarmessages?.mandatoryField, snacktype: SnackType.Error });
    }
  }
  /**
   * Method used to call cancel
   */
  cancel(): void {
    if (this.productForm && this.productForm.dirty) {
      const dialogRef = this.dialogService.openConfirmationDialog(this.dialogMessages?.unsavedChange, this.dialogMessages?.confirmation);
      this.subscriptionObject.add(dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.openDialog.closeAll();
          this.productForm.reset();
        }
      }))
    }
    else {
      this.openDialog.closeAll();
      this.productForm.reset();
    }
  }
  /**
  *  Angular lifecycle hook that is called when the component is destroyed.
  *  This method ensures that any subscriptions are properly unsubscribed to
  *  avoid memory leaks. 
  */
  ngOnDestroy(): void {
    // Unsubscribe from the subscription to prevent memory leaks
    this.subscriptionObject.unsubscribe();
  }
}

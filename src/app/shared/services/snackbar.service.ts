import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../components/snackbar/snackbar.component'; 
import { Snackbar,SnackType } from 'src/app/shared/models/model';
/**
 * SnackBar Service
 */
@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  /**
   * Snackbar details
   */
  details=[
    {type:SnackType.Success,icon:'check',panelClass:'snackbar-success'},
    {type:SnackType.Error,icon:'error',panelClass:'snackbar-error'},
    {type:SnackType.Warning,icon:'warning',panelClass:'snackbar-warning'},
    {type:SnackType.Default,icon:'clear',panelClass:'snackbar-default'},
    {type:SnackType.Info,icon:'info',panelClass:'snackbar-info'},
  ]
  /**
   * 
   * @param snackBar Import MatSnackBar
   */
  constructor(private snackBar: MatSnackBar) {

   }
   /**
    * Method used to open SnackBar
    * @param input 
    */
   openSnackBar(input:Snackbar) {
    const property=this.details.find(x=>x.type===input.snacktype);
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: {
       header:input.message,
       content:property?.icon
      },
      duration:input.duration?input.duration:3000,
      verticalPosition:'bottom',
     panelClass:input.panelClass?input.panelClass: property?.panelClass,
    });
  }
   
}

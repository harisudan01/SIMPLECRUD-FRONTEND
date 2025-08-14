import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../components/dialog/dialog.component';
/**
 * Dialog Service
 */
@Injectable({
  providedIn: 'root'
})
export class DialogService {
/**
 * 
 * @param dialog MatDialog
 */
  constructor(public dialog: MatDialog) { }
  /**
   * Method used to Open Dialog Box
   * @param message Dialog Message
   * @param header Dialog Header
   * @returns 
   */
  openConfirmationDialog(message: string, header:string) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        header: header,
        content:message,
        actionType: 'CONFIRMATION'
      }, 
      autoFocus: false
    });
    return dialogRef;
  }
}


import { Component,Inject} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
/**
 * Dialog Component
 */
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  /**
   * 
   * @param data Import Mat Dialog Data
   */
  constructor(@Inject(MAT_DIALOG_DATA) public data:any){}
}

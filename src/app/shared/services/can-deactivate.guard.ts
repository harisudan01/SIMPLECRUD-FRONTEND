import { Injectable, OnInit } from '@angular/core';
import { Observable, Observer, filter } from 'rxjs';
import { DialogService } from './dialog.service';
import { CanDeactivate } from '@angular/router';
/**
 * CanDeactivate Guard
 */
export abstract class FormCanDeactivate {
  /** 
    @return {boolean}
    */
  abstract canDeactivate(): boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuard implements CanDeactivate<FormCanDeactivate> {
  /**
   * 
   * @param dialogservice Inject Dialog services 
   */
  constructor(private dialogservice: DialogService) {

  }
  /**
   * 
   * @param component CanDeactivate
   * @returns 
   */
  canDeactivate(component: FormCanDeactivate): Observable<boolean> | boolean {
    if (!component.canDeactivate()) {
      return new Observable((observer: Observer<boolean>) => {
        const dialogRef = this.dialogservice.openConfirmationDialog(
          'You have unsaved changes! Are you sure you want to leave this page?',
          'Confirmation'
        );
        dialogRef.afterClosed().subscribe((result: boolean) => {
          observer.next(result);
          observer.complete();
        });
      });
    } else {
      return true;
    }
  }
}

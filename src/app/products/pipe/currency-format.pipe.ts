import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
/**
 * Currency Format Pipes 
 */
@Pipe({
  name: 'currencyFormat'
})
export class CurrencyFormatPipe implements PipeTransform {
  /**
  * @param currencyPipe
  */
  constructor(private currencyPipe: CurrencyPipe) {

  }
  /**
   * 
   * @param value Value to be transformed
   * @param currencyCode Currency Code
   * @returns 
   */
  transform(value: number, currencyCode: string): string | null {
    switch (currencyCode) {
      case 'USD':
        return this.currencyPipe.transform(value, 'USD', 'symbol', '1.2-2');
      case 'EUR':
        return this.currencyPipe.transform(value, 'EUR', 'symbol', '1.2-2');
      case 'INR':
        return this.currencyPipe.transform(value, 'INR', 'symbol', '1.2-2');
      default:
        return value.toString();
    }
  }

}

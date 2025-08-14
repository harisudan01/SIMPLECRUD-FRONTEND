import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';
/**
 * Directive uesd for Table Cells Style
 */
@Directive({
  selector: '[appTablestyle]'
})
export class TablestyleDirective {
 /**
   * @param el - Reference to the host DOM element
   * @param renderer - Renderer2 service for safely manipulating DOM elements
   */
  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.setStyle();
  }
/**
 * Set styles for table cells
 */
  private setStyle() {
    this.renderer.setStyle(this.el.nativeElement, 'padding', '10px');
    this.renderer.setStyle(this.el.nativeElement, 'text-align', 'center');
    this.renderer.setStyle(this.el.nativeElement, 'border', '1px solid #ddd');
    this.renderer.setStyle(this.el.nativeElement, 'background-color', '#f9f9f9');
  }
/**
 * On Mouse hover Background Color changes
 * @HostListener
 */
  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.setStyle(this.el.nativeElement, 'background-color', '#e0f7fa');
  }
/**
 * On Mouse leave Background Color changes
 * @HostListener
 */
  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.setStyle(this.el.nativeElement, 'background-color', '#f9f9f9');
  }

}

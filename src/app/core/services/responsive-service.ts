import { computed, inject, Injectable } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class ResponsiveService {
  private readonly small = '(max-width: 639px)'; // до sm
  private readonly medium = '(min-width: 640px) and (max-width: 1023px)'; // sm–lg-1
  private readonly large = '(min-width: 1024px)'; // lg и выше


  private readonly breakpointObserver = inject(BreakpointObserver);

  private readonly screenWidth$ = this.breakpointObserver.observe([this.small, this.medium, this.large]);

  private readonly screenWidth = toSignal(this.screenWidth$);

  smallWidth = computed(() => this.screenWidth()?.breakpoints[this.small]);
  mediumWidth = computed(() => this.screenWidth()?.breakpoints[this.medium]);
  largeWidth = computed(() => this.screenWidth()?.breakpoints[this.large]);
}

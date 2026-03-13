import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private readonly _opened = signal(false);
  
  readonly opened = computed(() => this._opened());
  
  toggle() {
    this._opened.update((value) => !value);
  }

  closeSidebar() {
    this._opened.set(false);
  }
}

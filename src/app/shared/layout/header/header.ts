import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';
import { SidebarService } from '../../../core/services/sidebar-service';
import { ResponsiveService } from '../../../core/services/responsive-service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [MatToolbar, MatIconButton, MatIconModule],
  templateUrl: './header.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  protected readonly sidebarService = inject(SidebarService);
  protected readonly responsiveService = inject(ResponsiveService);
  private router = inject(Router);

  protected readonly title = signal('authors-books-app');
  protected readonly currentTheme = input.required<string>();
  toggleTheme = output<void>();
  private currentUrl = signal(this.router.url);

  constructor() {
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => {
        this.currentUrl.set(e.urlAfterRedirects);
      });
  }

  protected readonly isGenresPage = computed(() => this.currentUrl()?.includes('/genres'));
}

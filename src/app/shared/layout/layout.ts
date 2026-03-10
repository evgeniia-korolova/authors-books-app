import { Component, inject } from '@angular/core';
import { Header } from "./header/header";
import { Footer } from "./footer/footer";
import { RouterOutlet } from '@angular/router';
import { ThemeService } from '../../core/services/theme-service';

@Component({
  selector: 'app-layout',
  imports: [Header, Footer, RouterOutlet],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {
  protected readonly themeService = inject(ThemeService);
  protected readonly currentTheme = this.themeService.theme;

  toggleTheme() {
    const next = this.currentTheme() === 'light' ? 'dark' : 'light';
    document.documentElement.classList.remove(this.currentTheme());
    document.documentElement.classList.add(next);
    this.currentTheme.set(next);
  }
}

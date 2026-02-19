import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themeKey = 'theme';

  constructor() {
    this.loadTheme();
  }

  toggleTheme(): void {
    const isDark = document.body.classList.toggle('dark-theme');
    localStorage.setItem(this.themeKey, isDark ? 'dark' : 'light');
  }

  loadTheme(): void {
    const savedTheme = localStorage.getItem(this.themeKey);
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-theme');
    }
  }

  isDarkMode(): boolean {
    return document.body.classList.contains('dark-theme');
  }
}

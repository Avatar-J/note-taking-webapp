import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-header',
  imports: [FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  searchQuery: string = '';
  dataService = inject(DataService);
  menuOpen = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const savedFont = localStorage.getItem('font') || 'sans-serif';

    document.body.setAttribute('data-theme', savedTheme);
    document.body.style.fontFamily = savedFont;
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }
  closeMenu() {
    this.menuOpen = false;
  }
  setTheme(theme: 'light' | 'dark'): void {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    this.menuOpen = false;
  }

  setFont(font: string): void {
    document.body.style.fontFamily = font;
    localStorage.setItem('font', font);
    this.menuOpen = false;
    document.body.classList.forEach((classname) => {
      if (classname.startsWith('font-')) {
        document.body.classList.remove(classname);
      }
      document.body.classList.add(font);
    });
  }
}

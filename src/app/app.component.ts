import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ViewNoteComponent } from './pages/view-note/view-note.component';
import { DataService } from './services/data.service';
import { BottomBarComponent } from './components/bottom-bar/bottom-bar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    SidebarComponent,
    DashboardComponent,
    BottomBarComponent,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'note-taking-webapp';

  dataService = inject(DataService);

  isSmallScreen = false;
  resizeObserver: any;

  ngOnInit(): void {
    this.checkScreenSize();

    this.resizeObserver = () => this.checkScreenSize();
    window.addEventListener('resize', this.resizeObserver);
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.resizeObserver);
  }

  private checkScreenSize(): void {
    this.isSmallScreen = window.innerWidth < 1000;
  }
}

import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  isEmpty: boolean = false;

  constructor(private dataService: DataService) {
    this.dataService.notes$.subscribe(
      (data) => (this.isEmpty = data.length === 0 ? true : false)
    );
  }
}

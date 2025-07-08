import { Component, inject, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  isEmpty: boolean = false;
  dataService = inject(DataService);

  // constructor(private dataService: DataService) {
  //   this.dataService.notes$.subscribe(
  //     (data) => (this.isEmpty = data.length === 0 ? true : false)
  //   );
  // }

  ngOnInit(): void {
    this.isEmpty = this.dataService.notes.length === 0 ? true : false;
  }

  onFilterByTag(query: string) {
    this.dataService.filterNotes(query);
  }
  onArchiveList() {
    console.log('arhived list');
    this.dataService.showArchivedNotes();
  }
}

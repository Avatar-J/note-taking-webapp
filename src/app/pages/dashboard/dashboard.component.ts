import { Component, inject, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Note } from '../../models/note';
import { NoteCardComponent } from '../../components/note-card/note-card.component';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [NoteCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  dataService = inject(DataService);
  notes!: Note[];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.dataService.notes$.subscribe((data) => (this.notes = data));
  }

  onCreateNewNote() {
    this.router.navigate([{ outlets: { desktop: ['create'] } }]);
    console.log('new note created');
  }
}

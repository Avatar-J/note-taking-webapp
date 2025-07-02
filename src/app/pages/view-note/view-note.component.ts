import { Component, inject } from '@angular/core';
import { FormComponent } from '../../components/form/form.component';
import { DataService } from '../../services/data.service';
import { Note } from '../../models/note';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-view-note',
  imports: [FormComponent, CommonModule],
  templateUrl: './view-note.component.html',
  styleUrl: './view-note.component.scss',
})
export class ViewNoteComponent {
  isEmpty: boolean = true;
  dataService = inject(DataService);

  constructor() {
    this.dataService.notes$.subscribe((data) => {
      this.isEmpty = data.length === 0 ? true : false;
    });
  }
}

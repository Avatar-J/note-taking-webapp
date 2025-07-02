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
  selectedNote!: Note | null;
  archiveText: string = 'Archive Note';

  constructor() {
    this.dataService.notes$.subscribe((data) => {
      this.isEmpty = data.length === 0 ? true : false;
    });

    this.dataService.singleNote$.subscribe({
      next: (value) => {
        this.selectedNote = value;
        if (value) {
          this.setArchiveText(value.isArchived);
        }
      },
    });
  }
  setArchiveText(archive: boolean) {
    this.archiveText = archive ? 'Unarchive Note' : 'Archive Note';
  }

  onArchive() {
    if (this.selectedNote) {
      this.dataService.toggleArchive(this.selectedNote.id);
      console.log('archive', this.selectedNote.isArchived);
      this.setArchiveText(this.selectedNote.isArchived);
    }
  }

  onDelete() {
    if (this.selectedNote) {
      this.dataService.deleteNote(this.selectedNote.id);
    }
  }
}

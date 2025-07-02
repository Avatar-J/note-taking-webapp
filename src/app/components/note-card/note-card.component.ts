import { Component, Input, inject } from '@angular/core';
import { Note } from '../../models/note';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { ModalComponent } from '../modal/modal.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-note-card',
  imports: [CommonModule],
  templateUrl: './note-card.component.html',
  styleUrl: './note-card.component.scss',
})
export class NoteCardComponent {
  @Input() Note!: Note;

  isNoteActive: boolean = false;

  constructor(private dataService: DataService) {
    this.dataService.singleNote$.subscribe((data) => {
      this.isNoteActive = data?.id === this.Note?.id ? true : false;
    });
  }

  onNoteSelected() {
    this.dataService.getNoteById(this.Note.id);
  }
}

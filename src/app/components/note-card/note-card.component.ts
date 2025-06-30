import { Component, Input, inject } from '@angular/core';
import { Note } from '../../models/note';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-note-card',
  imports: [ModalComponent],
  templateUrl: './note-card.component.html',
  styleUrl: './note-card.component.scss',
})
export class NoteCardComponent {
  @Input() Note!: Note;

  isModalActive: boolean = false;

  router = inject(Router);

  constructor(private dataService: DataService) {}

  onArchive() {
    this.dataService.toggleArchive(this.Note.id);
  }
  onDelete() {
    this.toggleModal();
  }

  toggleModal() {
    this.isModalActive = !this.isModalActive;
  }
}

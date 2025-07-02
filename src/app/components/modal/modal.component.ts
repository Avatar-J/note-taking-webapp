import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @Output()
  closeModal = new EventEmitter();

  dataService = inject(DataService);
  route = inject(ActivatedRoute);
  noteId!: number | undefined;

  constructor() {
    this.dataService.singleNote$.subscribe((data) => (this.noteId = data?.id));
  }

  onCancelDelete() {
    this.closeModal.emit();
  }
  onDeletePost() {
    if (this.noteId) {
      this.dataService.deleteNote(this.noteId);
    }
    this.closeModal.emit();
  }
}

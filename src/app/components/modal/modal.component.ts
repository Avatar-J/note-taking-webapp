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

  @Input()
  NoteId!: number;

  dataService = inject(DataService);
  route = inject(ActivatedRoute);

  onCancelDelete() {
    this.closeModal.emit();
  }
  onDeletePost() {
    this.dataService.deleteNote(this.NoteId);
    this.closeModal.emit();
  }
}

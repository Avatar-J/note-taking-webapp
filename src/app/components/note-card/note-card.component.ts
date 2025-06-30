import { Component, Input, inject } from '@angular/core';
import { Note } from '../../models/note';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-note-card',
  imports: [],
  templateUrl: './note-card.component.html',
  styleUrl: './note-card.component.scss',
})
export class NoteCardComponent {
  @Input() Note!: Note;

  isModalActive: boolean = false;

  router = inject(Router);

  constructor(
    // public authService: AuthService,
    private activatedroute: ActivatedRoute
  ) {}

  onEdit() {
    // this.router.navigate(['/edit', this.post.id]);
  }
  onDelete() {
    this.toggleModal();
  }

  toggleModal() {
    this.isModalActive = !this.isModalActive;
  }
}

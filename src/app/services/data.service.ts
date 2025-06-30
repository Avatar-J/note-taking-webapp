import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Note } from '../models/note';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private notes: Note[] = [];

  noteSubject = new BehaviorSubject<Note[]>([]);
  notes$ = this.noteSubject.asObservable();

  private updateSubject(): void {
    this.noteSubject.next([...this.notes]);
  }

  createNote(note: Omit<Note, 'id' | 'createdAt'>): void {
    const newNote: Note = {
      ...note,
      id: Date.now(),
      createdAt: Date.now(),
    };
    this.notes.push(newNote);
    this.updateSubject();
  }

  getNoteById(id: number): Note | undefined {
    return this.notes.find((note) => note.id === id);
  }

  updateNote(id: number, updatedFields: Partial<Note>): void {
    const index = this.notes.findIndex((note) => note.id === id);
    if (index !== -1) {
      this.notes[index] = { ...this.notes[index], ...updatedFields };
      this.updateSubject();
    }
  }

  deleteNote(id: number): void {
    this.notes = this.notes.filter((note) => note.id !== id);
    this.updateSubject();
  }

  toggleArchive(id: number): void {
    const note = this.getNoteById(id);
    if (note) {
      note.isArchived = !note.isArchived;
      this.updateSubject();
    }
  }

  searchNotes(query: string): Observable<Note[]> {
    const lowerQuery = query.toLowerCase();
    return this.notes$.pipe(
      map((notes) =>
        notes.filter(
          (note) =>
            note.title.toLowerCase().includes(lowerQuery) ||
            note.content.toLowerCase().includes(lowerQuery) ||
            note.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
        )
      )
    );
  }
}

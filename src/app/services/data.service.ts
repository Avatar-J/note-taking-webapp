import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Note } from '../models/note';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  notes: Note[] = [
    {
      id: 1,
      title: 'My house',
      content: 'Something is crazy about is about to happen',
      tags: ['Cooking', 'dev', 'react'],
      isArchived: false,
      createdAt: Date.now(),
      lastModified: Date.now(),
    },
    {
      id: 2,
      title: 'My name',
      content: 'My name is beautiful',
      tags: ['Personal'],
      isArchived: false,
      createdAt: Date.now(),
      lastModified: Date.now(),
    },
  ];
  activeNote!: Note;

  noteSubject = new BehaviorSubject<Note[]>(this.notes);
  notes$ = this.noteSubject.asObservable();

  singleNoteSubject = new BehaviorSubject<Note | null>(null);
  singleNote$ = this.singleNoteSubject.asObservable();

  constructor() {
    this.notes$.subscribe((data) => this.singleNoteSubject.next(data[0]));
  }

  updateSubject(): void {
    this.noteSubject.next([...this.notes]);
  }

  createNote(note: Omit<Note, 'id' | 'createdAt' | 'lastModified'>): void {
    const newNote: Note = {
      ...note,
      id: Date.now(),
      createdAt: Date.now(),
      lastModified: Date.now(),
    };
    this.notes.unshift(newNote);
    this.updateSubject();
  }

  getNoteById(id: number) {
    const foundNote = this.notes.find((note) => note.id === id) ?? null;
    this.singleNoteSubject.next(foundNote);
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
    const note = this.notes.find((note) => note.id === id);
    if (note) {
      note.isArchived = !note.isArchived;
      this.updateSubject();
    }
  }

  searchNotes(query: string) {
    const lowerQuery = query.toLowerCase().trim();
    const filtered = this.notes.filter(
      (note) =>
        note.title.toLowerCase().includes(lowerQuery) ||
        note.content.toLowerCase().includes(lowerQuery) ||
        note.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
    );

    this.noteSubject.next(filtered);
  }
  filterNotes(tag: string): void {
    const filtered = this.notes.filter((note) => note.tags.includes(tag));

    this.noteSubject.next(filtered);
  }
  showArchivedNotes() {
    const filtered = this.notes.filter((note) => note.isArchived === true);

    this.noteSubject.next(filtered);
  }
}

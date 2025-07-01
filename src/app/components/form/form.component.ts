import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Note } from '../../models/note';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  @Input() Note?: Note;

  formBuilder = inject(FormBuilder);
  dataService = inject(DataService);

  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: [
        this.Note?.title || '',
        [Validators.required, Validators.minLength(5)],
      ],
      tags: [
        this.Note?.tags?.join(', ') || '',
        [Validators.required, Validators.pattern(/^(\s*\w+\s*)(,\s*\w+\s*)*$/)],
      ],
      date: [this.Note?.lastModified || 'Not yet saved'],
      body: [
        this.Note?.content || '',
        [Validators.required, Validators.maxLength(1000)],
      ],
    });
  }

  onCancel() {}
  onSubmit() {
    if (this.form.valid) {
      const newNote: Note = {
        id: this.Note ? this.Note.id : 0,
        title: this.form.value.title,
        content: this.form.value.body,
        tags: this.Note ? this.Note.tags : [],
        isArchived: this.Note ? this.Note.isArchived : false,
        createdAt: this.Note ? this.Note.createdAt : Date.now(),
        lastModified: this.Note ? this.Note.lastModified : Date.now(),
      };

      if (this.Note) {
        this.dataService.updateNote(this.Note.id, newNote);
        // this.toastService.show('Updated post successfully', 'success');
      } else {
        this.dataService.createNote(newNote);
        // this.toastService.show('Created new post successfully', 'success');
      }
    }
  }
}

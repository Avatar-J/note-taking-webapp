import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Note } from '../../models/note';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent implements OnChanges {
  @Input() Note: Note | null = null;

  formBuilder = inject(FormBuilder);
  dataService = inject(DataService);
  router = inject(Router);
  showValidity = false;

  form!: FormGroup;

  constructor() {
    this.form = this.formBuilder.group({
      title: [
        this.Note?.title || '',
        [Validators.required, Validators.minLength(5)],
      ],
      tags: [
        this.Note?.tags?.join(', ') || '',
        [Validators.required, Validators.pattern(/^(\s*\w+\s*)(,\s*\w+\s*)*$/)],
      ],
      lastModified: [
        this.Note?.lastModified
          ? this.formatDate(this.Note.lastModified)
          : 'Not yet saved',
      ],
      content: [
        this.Note?.content || '',
        [Validators.required, Validators.maxLength(1000)],
      ],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const formattedNote = {
      ...this.Note,
      lastModified: this.Note?.lastModified
        ? this.formatDate(this.Note.lastModified)
        : 'Not yet saved',
    };
    this.form.patchValue(formattedNote);
  }

  ngOnInit(): void {}

  private formatDate(timestamp: number): string {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }
  onCancel() {
    if (!this.Note) {
      this.router.navigate([{ outlets: { desktop: ['view'] } }]);
    }
  }
  onSubmit() {
    if (this.form.valid) {
      this.showValidity = false;
      const rawTags = this.form.value.tags || '';
      const tagArray = rawTags
        .split(',')
        .map((tag: string) => tag.trim())
        .filter((tag: string) => tag.length > 0);

      const newNote: Note = {
        id: this.Note ? this.Note.id : 0,
        title: this.form.value.title,
        content: this.form.value.content,
        tags: tagArray,
        isArchived: this.Note ? this.Note.isArchived : false,
        createdAt: this.Note ? this.Note.createdAt : Date.now(),
        lastModified: this.Note ? this.Note.lastModified : Date.now(),
      };

      if (this.Note) {
        this.dataService.updateNote(this.Note.id, newNote);
      } else {
        console.log(newNote);
        this.dataService.createNote(newNote);
        this.router.navigate([{ outlets: { desktop: ['view'] } }]);
      }
    } else {
      this.showValidity = true;
    }
  }
}

import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Genre } from '../../core/models/genre.model';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LibraryStore } from '../../library-store/library-store';
import { uniqueGenreValidator } from './validators/unique-genre-validator';
import { v4 as uuidv4 } from 'uuid';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-genre-dialog',
  imports: [ReactiveFormsModule, MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,],
  templateUrl: './add-genre-dialog.html',
  styleUrl: './add-genre-dialog.scss',
})
export class AddGenreDialog {
  private dialogRef = inject(MatDialogRef<AddGenreDialog, Genre>);
  private fb = inject(FormBuilder);
  protected readonly libraryStore = inject(LibraryStore);

  private data = inject<{ genre: Genre }>(MAT_DIALOG_DATA);

  form = this.fb.nonNullable.group(
    {
      title: this.fb.nonNullable.control('', Validators.required),
    },
    { validators: uniqueGenreValidator(this.libraryStore) }
  );

  save() {
    if (this.form.valid) {
      const formValue = this.form.getRawValue();

      const genre: Genre = {
        id: uuidv4(),
        title: formValue.title,
      };

      this.dialogRef.close(genre);
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}

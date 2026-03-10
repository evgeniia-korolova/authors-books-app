import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Author } from '../../core/models/author.model';
import { v4 as uuidv4 } from 'uuid';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { uniqueAuthorValidator } from './validators/unique-author-validator';
import { LibraryStore } from '../../library-store/library-store';

@Component({
  selector: 'app-add-author-dialog',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './add-author-dialog.html',
  styleUrl: './add-author-dialog.scss',
})
export class AddAuthorDialog {
  private dialogRef = inject(MatDialogRef);
  private fb = inject(FormBuilder);
  protected readonly libraryStore = inject(LibraryStore)

  form = this.fb.nonNullable.group({
    lastName: this.fb.nonNullable.control('', Validators.required),
    firstName: this.fb.nonNullable.control('', Validators.required),
    middleName: this.fb.nonNullable.control(''),
    birthDate: this.fb.nonNullable.control('', Validators.required),
  }, { validators: uniqueAuthorValidator(this.libraryStore) }
);

  save() {
    if (this.form.valid) {
      const formValue = this.form.getRawValue();

      const newAuthor: Author = {
        id: uuidv4(),
        lastName: formValue.lastName,
        firstName: formValue.firstName,
        middleName: formValue.middleName || undefined,
        birthDate: new Date(formValue.birthDate),
        books: [],
      };

      this.dialogRef.close(newAuthor);
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}

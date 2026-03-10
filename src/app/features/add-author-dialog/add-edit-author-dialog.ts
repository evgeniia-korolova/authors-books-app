import { Component, inject, } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
  templateUrl: './add-edit-author-dialog.html',
  styleUrl: './add-edit-author-dialog.scss',
})
export class AddEditAuthorDialog {
  private dialogRef = inject(MatDialogRef<AddEditAuthorDialog, Author>); 
  private fb = inject(FormBuilder);
  protected readonly libraryStore = inject(LibraryStore); 
  private data = inject<{ author: Author | null }>(MAT_DIALOG_DATA);


  form = this.fb.nonNullable.group(
    {
      lastName: this.fb.nonNullable.control('', Validators.required),
      firstName: this.fb.nonNullable.control('', Validators.required),
      middleName: this.fb.nonNullable.control(''),
      birthDate: this.fb.nonNullable.control('', Validators.required),
    },
    { validators: uniqueAuthorValidator(this.libraryStore) }
  );

  constructor() {
    this.form = this.fb.nonNullable.group({
      lastName: this.fb.nonNullable.control('', Validators.required),
      firstName: this.fb.nonNullable.control('', Validators.required),
      middleName: this.fb.nonNullable.control(''),
      birthDate: this.fb.nonNullable.control('', Validators.required),
    }, { validators: uniqueAuthorValidator(this.libraryStore) });

    // если автор передан → заполняем форму
    if (this.data.author) {
      this.form.patchValue({
        lastName: this.data.author.lastName,
        firstName: this.data.author.firstName,
        middleName: this.data.author.middleName ?? '',
        birthDate: new Date(this.data.author.birthDate).toISOString().substring(0, 10),
      });
    }
  }



  save() {
    if (this.form.valid) {
      const formValue = this.form.getRawValue();

      const author: Author = {
        id: this.data.author?.id ?? uuidv4(),
        lastName: formValue.lastName,
        firstName: formValue.firstName,
        middleName: formValue.middleName || undefined,
        birthDate: new Date(formValue.birthDate),
        books: [],
      };

      this.dialogRef.close(author);
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}

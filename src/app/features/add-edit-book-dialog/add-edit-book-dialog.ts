import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Author } from '../../core/models/author.model';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LibraryStore } from '../../library-store/library-store';
import { uniqueBookValidator, } from './validators/unique-book-validator';
import { v4 as uuidv4 } from 'uuid';
import { Book } from '../../core/models/book.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-add-edit-book-dialog',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './add-edit-book-dialog.html',
  styleUrl: './add-edit-book-dialog.scss',
})
export class AddEditBookDialog {
  private dialogRef = inject(MatDialogRef<AddEditBookDialog, Author>);
  private fb = inject(FormBuilder);
  protected readonly libraryStore = inject(LibraryStore);
  protected data = inject<{ authorId: string; book?: Book }>(MAT_DIALOG_DATA);
  

  form = this.fb.nonNullable.group(
    {
      title: this.fb.nonNullable.control('', Validators.required),
      pages: this.fb.nonNullable.control(0, {
        validators: [Validators.required, Validators.min(1)],
      }),
      genre: this.fb.nonNullable.control(''),
    },
    { validators: uniqueBookValidator(this.libraryStore, this.data.authorId) }
);




  constructor() {
    // this.form = this.fb.nonNullable.group({
    //   title: this.fb.nonNullable.control('', Validators.required),
    //   pages: this.fb.nonNullable.control('', Validators.required),
    //   genre: this.fb.nonNullable.control(''),

    // }, { validators: this.uniqueBookValidator.validate.bind(this.uniqueBookValidator) });

    if (this.data.book) {
      this.form.patchValue({
        title: this.data.book.title,
        pages: this.data.book.pages,
        genre: this.data.book.genre.id,
      });
    }
  }

  save() {
    if (this.form.valid) {
      const formValue = this.form.getRawValue();

      const genre = this.libraryStore.genres().find((g) => g.id === formValue.genre);
      if (!genre) {
        // можно показать сообщение или просто не сохранять
        return;
      }

      const book: Book = {
        id: this.data.book?.id ?? uuidv4(),
        title: formValue.title,
        pages: formValue.pages,
        genre,
      };

      this.dialogRef.close(book);
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}

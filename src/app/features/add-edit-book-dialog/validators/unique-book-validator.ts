// import { inject, Injectable } from '@angular/core';
// import { LibraryStore } from '../../../library-store/library-store';
// import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

// @Injectable({
//   providedIn: 'root',
// })
// export class UniqueBookValidatorService {
//   private libraryStore = inject(LibraryStore);

//   async validate(control: AbstractControl): Promise<ValidationErrors | null> {
//     const formGroup = control.parent as FormGroup;
//     if (!formGroup) return null;

//     const title = formGroup.get('title')?.value?.trim();
//     const pages = formGroup.get('pages')?.value;
//     const genre = formGroup.get('genre')?.value;
//     const currentBookId = this.libraryStore.selectedBookId();

//     const books = this.libraryStore.selectedAuthorBooks();

//     const duplicate = books.find(
//       (book) =>
//         book.title.toLowerCase() === title?.toLowerCase() &&
//         book.pages === pages &&
//         book.genre.id === genre &&
//         book.id !== currentBookId
//     );

//     return duplicate ? { uniqueBook: true } : null;
//   }
// }

import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Author } from '../../../core/models/author.model';
import { Book } from '../../../core/models/book.model';

export function uniqueBookValidator(
  store: { authors: () => Author[] },
  authorId: string
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const { title, pages, genre } = control.value as Book;

    const authors = store.authors();
    const author = authors.find((a) => a.id === authorId);
    if (!author) return null;

    const exists = (author.books ?? []).some((b) => {
      const sameTitle = b.title.trim().toLowerCase() === title.trim().toLowerCase();
      const samePages = b.pages === pages;
      const sameGenre = typeof genre === 'string' ? b.genre.id === genre : b.genre.id === genre.id;

      return sameTitle && samePages && sameGenre;
    });

    return exists ? { duplicateBook: true } : null;
  };
}

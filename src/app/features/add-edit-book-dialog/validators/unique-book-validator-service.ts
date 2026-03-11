import { inject, Injectable } from '@angular/core';
import { LibraryStore } from '../../../library-store/library-store';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class UniqueBookValidatorService {
  private libraryStore = inject(LibraryStore);

  async validate(control: AbstractControl): Promise<ValidationErrors | null> {    
    const formGroup = control.parent as FormGroup;
    if (!formGroup) return null;

    const title = formGroup.get('title')?.value?.trim();
    const pages = formGroup.get('pages')?.value;
    const genre = formGroup.get('genre')?.value;
    const currentBookId = this.libraryStore.selectedBookId();

    const books = this.libraryStore.selectedAuthorBooks();

    const duplicate = books.find(
      (book) =>
        book.title.toLowerCase() === title?.toLowerCase() &&
        book.pages === pages &&
        book.genre.id === genre &&
        book.id !== currentBookId
    );

    return duplicate ? { uniqueBook: true } : null;
  }
}

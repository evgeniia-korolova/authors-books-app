import { Component, inject, output } from '@angular/core';
import { LibraryStore } from '../../../library-store/library-store';
import { BookItem } from '../book-item/book-item';
import { Book } from '../../../core/models/book.model';

@Component({
  selector: 'app-books-list',
  imports: [BookItem],
  templateUrl: './books-list.html',
  styleUrl: './books-list.scss',
})
export class BooksList {
  protected readonly libraryStore = inject(LibraryStore);
  readonly editBook = output<Book>();
  readonly deleteBook = output<Book>();


  onEditBook(book: Book) {
    this.editBook.emit(book);      
  }

  onDeleteBook(book: Book) {
    this.deleteBook.emit(book);
  }
}

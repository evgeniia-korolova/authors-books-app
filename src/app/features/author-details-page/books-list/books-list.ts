import { Component, inject } from '@angular/core';
import { LibraryStore } from '../../../library-store/library-store';
import { BookItem } from "../book-item/book-item";

@Component({
  selector: 'app-books-list',
  imports: [BookItem],
  templateUrl: './books-list.html',
  styleUrl: './books-list.scss',
})
export class BooksList {
  protected readonly libraryStore = inject(LibraryStore);

}

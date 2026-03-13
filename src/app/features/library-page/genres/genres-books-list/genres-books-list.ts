import { Component, inject } from '@angular/core';
import { LibraryStore } from '../../../../library-store/library-store';
import { GenresBookItem } from "../genres-book-item/genres-book-item";

@Component({
  selector: 'app-genres-books-list',
  imports: [GenresBookItem],
  templateUrl: './genres-books-list.html',
  styleUrl: './genres-books-list.scss',
})
export class GenresBooksList {
  protected readonly libraryStore = inject(LibraryStore);


}

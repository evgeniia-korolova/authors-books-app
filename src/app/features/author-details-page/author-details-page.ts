import { Component, inject, input } from '@angular/core';
import { LibraryStore } from '../../library-store/library-store';
import { DatePipe } from '@angular/common';
import { BooksList } from "./books-list/books-list";
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { Author } from '../../core/models/author.model';
import { Book } from '../../core/models/book.model';
import { AddEditBookDialog } from '../add-edit-book-dialog/add-edit-book-dialog';

@Component({
  selector: 'app-author-details-page',
  imports: [DatePipe, BooksList, MatButtonModule],
  templateUrl: './author-details-page.html',
  styleUrl: './author-details-page.scss',
})
export default class AuthorDetailsPage {
  authorId = input.required<string>();
  private dialog = inject(MatDialog);
  protected readonly libraryStore = inject(LibraryStore);
  author: Author = this.libraryStore.selectedAuthor()!;


  constructor() {
    this.libraryStore.setAuthorId(this.authorId);
  }

  addBook() {
    const dialogRef = this.dialog.open(AddEditBookDialog, {
      width: '500px',
      data: { author: this.authorId()},
    });

    dialogRef.afterClosed().subscribe((book: Book | undefined) => {
      if (book) {
        this.libraryStore.addBookToAuthor(this.authorId(), book);
      }
    });
  }

  editBook(book: Book) {
    const dialogRef = this.dialog.open(AddEditBookDialog, {
      width: '500px',
      data: { author: this.author, book }, // передаём автора и книгу
    });

    dialogRef.afterClosed().subscribe((updatedBook: Book | undefined) => {
      if (updatedBook) {
        this.libraryStore.updateBook(this.author.id, updatedBook);
      }
    });
  }


}

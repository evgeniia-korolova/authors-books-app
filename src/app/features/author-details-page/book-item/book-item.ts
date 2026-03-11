import { Component, input, output } from '@angular/core';
import { Book } from '../../../core/models/book.model';

@Component({
  selector: 'app-book-item',
  imports: [],
  templateUrl: './book-item.html',
  styleUrl: './book-item.scss',
})
export class BookItem {
  readonly book = input<Book>();
  readonly edit = output<Book>();
  readonly delete = output<Book>();

  onEdit() {
    const book = this.book();

    if (book) {
      this.edit.emit(book);
    }
  }

  onDelete() {
    const book = this.book();
    if (book) {
      this.delete.emit(book);
    }
  }
}

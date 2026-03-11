import { Component, input } from '@angular/core';
import { Book } from '../../../core/models/book.model';

@Component({
  selector: 'app-book-item',
  imports: [],
  templateUrl: './book-item.html',
  styleUrl: './book-item.scss',
})
export class BookItem {
  readonly book = input<Book>()
}

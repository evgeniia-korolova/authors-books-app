import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { BookWithAuthor } from '../../../../core/models/book-with-author.type';

@Component({
  selector: 'app-genres-book-item',
  imports: [],
  templateUrl: './genres-book-item.html',
  styleUrl: './genres-book-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenresBookItem {
  book = input.required<BookWithAuthor>()
}

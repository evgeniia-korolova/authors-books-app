import { Component, input, output } from '@angular/core';
import { Author } from '../../../core/models/author.model';

@Component({
  selector: 'app-author-row',
  imports: [],
  templateUrl: './author-row.html',
  styleUrl: './author-row.scss',
})
export class AuthorRow {
  author = input.required<Author>();
  removeAuthor = output<Author>();
  editAuthor = output<Author>();

  onEdit(author: Author) {    
    this.editAuthor.emit(author);
  }



  onRemove(author: Author) {
    this.removeAuthor.emit(author);
  }
}

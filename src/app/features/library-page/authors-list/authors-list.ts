import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthorRow } from '../author-row/author-row';

import { LibraryStore } from '../../../library-store/library-store';
import { Author } from '../../../core/models/author.model';

@Component({
  selector: 'app-authors-list',
  imports: [AuthorRow],
  templateUrl: './authors-list.html',
  styleUrl: './authors-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorsList {
  protected readonly libraryStore = inject(LibraryStore);

  onRemoveAuthor(author: Author) {
    this.libraryStore.removeAuthor(author);
  }
}

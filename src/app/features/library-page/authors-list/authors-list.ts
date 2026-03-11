import { ChangeDetectionStrategy, Component, inject,  } from '@angular/core';
import { AuthorRow } from '../author-row/author-row';

import { LibraryStore } from '../../../library-store/library-store';
import { Author } from '../../../core/models/author.model';
import { MatDialog } from '@angular/material/dialog';
import { AddEditAuthorDialog } from '../../add-author-dialog/add-edit-author-dialog';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-authors-list',
  imports: [AuthorRow, RouterLink],
  templateUrl: './authors-list.html',
  styleUrl: './authors-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorsList {
  protected readonly libraryStore = inject(LibraryStore);
  private dialog = inject(MatDialog);

  onEditAuthor(author: Author) {
    const dialogRef = this.dialog.open(AddEditAuthorDialog, {
      width: '80%',
      data: { author }, // передаём выбранного автора
    });

    dialogRef.afterClosed().subscribe((result: Author | undefined) => {      
      if (result) {
        this.libraryStore.updateAuthor(result);
      }
    });
  }

  onRemoveAuthor(author: Author) {
    this.libraryStore.removeAuthor(author);
  }
}

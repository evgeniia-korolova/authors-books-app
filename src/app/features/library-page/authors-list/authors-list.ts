import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthorRow } from '../author-row/author-row';
import { LibraryStore } from '../../../library-store/library-store';
import { Author } from '../../../core/models/author.model';
import { MatDialog } from '@angular/material/dialog';
import { AddEditAuthorDialog } from '../../add-author-dialog/add-edit-author-dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { SortOrder } from '../../../core/models/sort-order.type';
import { SortBy } from '../../../core/models/sort-by.type';

@Component({
  selector: 'app-authors-list',
  imports: [AuthorRow, MatFormFieldModule, MatInputModule, MatIconModule],
  templateUrl: './authors-list.html',
  styleUrl: './authors-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorsList {
  protected readonly libraryStore = inject(LibraryStore);
  private dialog = inject(MatDialog);

  openAddAuthorDialog() {
    const dialogRef = this.dialog.open(AddEditAuthorDialog, {
      width: '80%',
      data: { author: null },
    });

    dialogRef.afterClosed().subscribe((result: Author | undefined) => {
      if (result) {
        this.libraryStore.addAuthor(result);
      }
    });
  }

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

  toggleSort(by: SortBy) {
    const currentBy = this.libraryStore.sortCreterion();
    const currentOrder = this.libraryStore.sortAction();

    let nextOrder: SortOrder = 'asc';
    if (currentBy === by) {
      nextOrder = currentOrder === 'asc' ? 'desc' : currentOrder === 'desc' ? 'none' : 'asc';
    }

    this.libraryStore.sortAuthors(by, nextOrder);
  }
}

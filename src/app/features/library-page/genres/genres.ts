import { Component, inject, signal } from '@angular/core';
import { LibraryStore } from '../../../library-store/library-store';
import { TitleCasePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AddGenreDialog } from '../../add-genre-dialog/add-genre-dialog';
import { Genre } from '../../../core/models/genre.model';
import { MatButtonModule } from '@angular/material/button';
import { SortAction } from '../../../core/models/sort-actions.type';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-genres',
  imports: [TitleCasePipe, MatButtonModule, MatIconModule],
  templateUrl: './genres.html',
  styleUrl: './genres.scss',
})
export class Genres {
  protected readonly libraryStore = inject(LibraryStore);
  private dialog = inject(MatDialog);
  sortOrder = signal<SortAction>('none');

  openAddGenreDialog() {
    const dialogRef = this.dialog.open(AddGenreDialog, {
      width: '60%',
      data: { genre: null },
    });

    dialogRef.afterClosed().subscribe((result: Genre | undefined) => {
      if (result) {
        this.libraryStore.addGenre(result);
      }
    });
  }

  toggleSort() {
    const current = this.sortOrder();
    const next = current === 'none' ? 'asc' : current === 'asc' ? 'desc' : 'none';

    this.sortOrder.set(next);
    this.libraryStore.sortGenres(next);
  }
}

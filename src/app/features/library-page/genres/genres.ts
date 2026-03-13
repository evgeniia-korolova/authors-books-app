import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { LibraryStore } from '../../../library-store/library-store';
import { TitleCasePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AddGenreDialog } from '../../add-genre-dialog/add-genre-dialog';
import { Genre } from '../../../core/models/genre.model';
import { MatButtonModule } from '@angular/material/button';

import { MatIconModule } from '@angular/material/icon';
import { SortOrder } from '../../../core/models/sort-order.type';
import { GenresBooksList } from "./genres-books-list/genres-books-list";

@Component({
  selector: 'app-genres',
  imports: [TitleCasePipe, MatButtonModule, MatIconModule, GenresBooksList],
  templateUrl: './genres.html',
  styleUrl: './genres.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Genres {
  protected readonly libraryStore = inject(LibraryStore);
  private dialog = inject(MatDialog);
  sortOrder = signal<SortOrder>('none');

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

  onSelectGenre(title: string) {
    this.libraryStore.selectGenre(title)
  }
}

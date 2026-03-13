import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { LibraryStore } from '../../../library-store/library-store';
import { TitleCasePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AddGenreDialog } from '../../add-genre-dialog/add-genre-dialog';
import { Genre } from '../../../core/models/genre.model';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { GenresBooksList } from './genres-books-list/genres-books-list';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { SidebarService } from '../../../core/services/sidebar-service';
import { ResponsiveService } from '../../../core/services/responsive-service';

@Component({
  selector: 'app-genres',
  imports: [TitleCasePipe, MatButtonModule, MatIconModule, GenresBooksList, ReactiveFormsModule],
  templateUrl: './genres.html',
  styleUrl: './genres.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Genres {
  protected readonly libraryStore = inject(LibraryStore);
  private dialog = inject(MatDialog);
  protected readonly sidebarService = inject(SidebarService);
  protected readonly responsiveService = inject(ResponsiveService);
  protected searchControl = new FormControl('');
  protected readonly searchTerm = signal('');

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
    this.libraryStore.selectGenre(title);
    this.sidebarService.closeSidebar();
  }

  searchTermFromInput = toSignal(
    this.searchControl.valueChanges.pipe(debounceTime(300), distinctUntilChanged()),
    { initialValue: '' }
  );

  updateSearchTerm() {
    this.searchTerm.set(this.searchTermFromInput() ?? '');
    this.libraryStore.setSearchBookTerm(this.searchTerm());
  }

  clearSearch() {
    this.searchControl.setValue('');

    this.searchTerm.set('');
    this.libraryStore.setSearchBookTerm('');
  }
}

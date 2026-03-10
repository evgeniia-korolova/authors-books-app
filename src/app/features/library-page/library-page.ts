import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AddAuthorDialog } from '../add-author-dialog/add-author-dialog';
import { Author } from '../../core/models/author.model';
import { LibraryStore } from '../../library-store/library-store';

@Component({
  selector: 'app-library-page',
  imports: [MatButtonModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './library-page.html',
  styleUrl: './library-page.scss',
})
export class LibraryPage {
  private dialog = inject(MatDialog);
  libraryStore = inject(LibraryStore);

  openAddAuthorDialog() {
    const dialogRef = this.dialog.open(AddAuthorDialog, {
      width: '80%',
    });

    dialogRef.afterClosed().subscribe((result: Author | undefined) => {
      console.log('close dialog');
      if (result) {
        this.libraryStore.addAuthor(result);
      }
    });
  }
}

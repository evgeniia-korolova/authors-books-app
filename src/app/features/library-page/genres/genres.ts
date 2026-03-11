import { Component, inject } from '@angular/core';
import { LibraryStore } from '../../../library-store/library-store';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-genres',
  imports: [TitleCasePipe],
  templateUrl: './genres.html',
  styleUrl: './genres.scss',
})
export class Genres {
  protected readonly libraryStore = inject(LibraryStore);
}

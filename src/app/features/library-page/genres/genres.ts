import { Component, inject } from '@angular/core';
import { LibraryStore } from '../../../library-store/library-store';

@Component({
  selector: 'app-genres',
  imports: [],
  templateUrl: './genres.html',
  styleUrl: './genres.scss',
})
export class Genres {
  protected readonly libraryStore = inject(LibraryStore);
}

import { Component, inject, input } from '@angular/core';
import { LibraryStore } from '../../library-store/library-store';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-author-details-page',
  imports: [DatePipe],
  templateUrl: './author-details-page.html',
  styleUrl: './author-details-page.scss',
})
export default class AuthorDetailsPage {
  authorId = input.required<string>();
  protected readonly libraryStore = inject(LibraryStore);

  constructor() {
    this.libraryStore.setAuthorId(this.authorId);
  }
}

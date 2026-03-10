import { ChangeDetectionStrategy, Component, inject, } from '@angular/core';
import { AuthorRow } from "../author-row/author-row";

import { LibraryStore } from '../../../library-store/library-store';

@Component({
  selector: 'app-authors-list',
  imports: [AuthorRow],
  templateUrl: './authors-list.html',
  styleUrl: './authors-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorsList { 
  protected readonly libraryStore = inject(LibraryStore); 
}




import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LibraryStore } from '../../library-store/library-store';

@Component({
  selector: 'app-library-page',
  imports: [MatButtonModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './library-page.html',
  styleUrl: './library-page.scss',
})
export class LibraryPage {  
  libraryStore = inject(LibraryStore);  
}

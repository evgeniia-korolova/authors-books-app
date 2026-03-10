import { Routes } from '@angular/router';
import { AuthorsList } from './features/library-page/authors-list/authors-list';
import { LibraryPage } from './features/library-page/library-page';
import { Genres } from './features/library-page/genres/genres';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'library',
  },
  {
    path: 'library',
    component: LibraryPage,
    children: [
      { path: 'authors', component: AuthorsList },
      { path: 'genres', component: Genres },
      { path: '', redirectTo: 'authors', pathMatch: 'full' }
    ]
  },
];

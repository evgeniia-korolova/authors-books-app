import { Author } from '../core/models/author.model';
import { Book } from '../core/models/book.model';
import { Genre } from '../core/models/genre.model';
import { withStorageSync } from '@angular-architects/ngrx-toolkit';
import {
  patchState,  
  signalStore,  
  withMethods,
  withState,
} from '@ngrx/signals';

export interface LibraryState {
  authors: Author[];
  books: Book[];
  genres: Genre[];

  selectedAuthorId: string | undefined; // выбранный автор (для страницы деталей)
  selectedBookId: string | undefined; // выбранная книга (для редактирования/деталей)
  selectedGenreId: string | undefined; // выбранный жанр (для фильтрации)

  loading: boolean; // индикатор загрузки (например, при синхронизации с localStorage)
  searchTerm: string; // строка поиска по авторам/книгам
  filterActive: boolean; // включена ли фильтрация
}

export const LibraryStore = signalStore(
  {
    providedIn: 'root',
  },
  withState({
    authors: [],
    books: [],
    genres: [],

    selectedAuthorId: undefined,
    selectedBookId: undefined,
    selectedGenreId: undefined,

    loading: false,
    searchTerm: '',
    filterActive: false,
  } as LibraryState),
  withStorageSync({
    key: 'library-store',
    select: ({ authors, books, genres }) => ({ authors, books, genres }),
  }),
  withMethods((store) => ({
    addAuthor: (author: Author) => {
      const authors = store.authors();
      const exists = authors.some((a) => {
        const sameLast = a.lastName.trim().toLowerCase() === author.lastName.trim().toLowerCase();
        const sameFirst =
          a.firstName.trim().toLowerCase() === author.firstName.trim().toLowerCase();

        if (a.middleName && author.middleName) {
          return (
            sameLast &&
            sameFirst &&
            a.middleName.trim().toLowerCase() === author.middleName.trim().toLowerCase()
          );
        }       
        return sameLast && sameFirst;
      });

      if (!exists) {
        patchState(store, { authors: [...authors, author] });
        console.log('Author added:', author);
      } else {
        console.log('Duplicate author detected:', author);
      }
    },

    removeAuthor: (author: Author) => {
        patchState(store, {
          authors: store.authors().filter((person) => person.id !== author.id),
        });
      },
  }))
);

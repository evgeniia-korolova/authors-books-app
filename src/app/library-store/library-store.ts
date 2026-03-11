import { computed } from '@angular/core';
import { Author } from '../core/models/author.model';
import { Genre } from '../core/models/genre.model';
import { withStorageSync } from '@angular-architects/ngrx-toolkit';
import {
  patchState,
  signalMethod,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Book } from '../core/models/book.model';

export interface LibraryState {
  authors: Author[];
  genres: Genre[];

  selectedAuthorId: string | undefined;
  selectedBookId: string | undefined;
  selectedGenreId: string | undefined;

  loading: boolean;
  searchTerm: string;
  filterActive: boolean;
}

export const LibraryStore = signalStore(
  {
    providedIn: 'root',
  },
  withState({
    authors: [],
    genres: [
      { id: '1', title: 'Poetry' },
      { id: '2', title: 'Novel' },
      { id: '3', title: 'Drama' },
    ],

    selectedAuthorId: undefined,
    selectedBookId: undefined,
    selectedGenreId: undefined,

    loading: false,
    searchTerm: '',
    filterActive: false,
  } as LibraryState),

  withStorageSync({
    key: 'library-store',
    select: ({ authors, genres }) => ({ authors, genres }),
  }),
  withComputed(({ authors, selectedAuthorId }) => ({
    selectedAuthor: computed(() => authors().find((person) => person.id === selectedAuthorId())),
    selectedAuthorBooks: computed(
      () => authors().find((person) => person.id === selectedAuthorId())?.books ?? []
    ),
  })),

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

    updateAuthor: (author: Author) => {
      patchState(store, {
        authors: store.authors().map((a) => (a.id === author.id ? author : a)),
      });
    },

    setAuthorId: signalMethod<string>((authorId: string) => {
      patchState(store, { selectedAuthorId: authorId });
    }),

    addBookToAuthor: (authorId: string, book: Book) => {
      patchState(store, {
        authors: store
          .authors()
          .map((a) => (a.id === authorId ? { ...a, books: [...a.books, book] } : a)),
      });
    },

    updateBook: (authorId: string, updatedBook: Book) => {
      patchState(store, {
        authors: store.authors().map((a) =>
          a.id === authorId
            ? {
                ...a,
                books: a.books.map((b) => (b.id === updatedBook.id ? updatedBook : b)),
              }
            : a
        ),
      });
    },

    removeBook: (authorId: string, bookId: string) => {
      patchState(store, {
        authors: store.authors().map((a) =>
          a.id === authorId
            ? {
                ...a,
                books: (a.books ?? []).filter((b) => b.id !== bookId),
              }
            : a
        ),
      });
    },

    addGenre: (genre: Genre) => {
      // const exists = store.genres().some(
      //   g => g.title.trim().toLowerCase() === genre.title.trim().toLowerCase()
      // );
    
      // if (exists) {
      //   console.warn('Genre already exists:', genre.title);
      //   return;
      // }
    
      patchState(store, {
        genres: [...store.genres(), genre],
      });
    },    

  }))
);

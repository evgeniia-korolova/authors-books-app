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
import { SortOrder } from '../core/models/sort-order.type';
import { SortBy } from '../core/models/sort-by.type';

export interface LibraryState {
  authors: Author[];
  sortedAuthors: Author[];
  genres: Genre[];
  sortedGenres: Genre[];
  selectedAuthorId: string | undefined;
  selectedBookId: string | undefined;
  selectedGenreId: string | undefined;
  sortAction: SortOrder;
  sortCreterion: SortBy;
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
    sortedAuthors: [],
    genres: [
      { id: '1', title: 'Poetry' },
      { id: '2', title: 'Novel' },
      { id: '3', title: 'Drama' },
    ],
    sortedGenres: [],
    selectedAuthorId: undefined,
    sortAction: 'none',
    sortCreterion: 'none',
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
  withComputed(
    ({ authors, selectedAuthorId, genres, sortedGenres, sortedAuthors, searchTerm }) => ({
      selectedAuthor: computed(() => authors().find((person) => person.id === selectedAuthorId())),
      selectedAuthorBooks: computed(
        () => authors().find((person) => person.id === selectedAuthorId())?.books ?? []
      ),
      displayedGenres: computed(() => (sortedGenres().length ? sortedGenres() : genres())),

      filteredAuthors: computed(() => {
        const base = sortedAuthors().length ? sortedAuthors() : authors();
        const term = searchTerm().toLowerCase();

        return term
          ? base.filter((a) => `${a.firstName} ${a.lastName}`.toLowerCase().includes(term))
          : base;
      }),
    })
  ),

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
      patchState(store, {
        genres: [...store.genres(), genre],
      });
    },

    sortGenres: (action: SortOrder) => {
      const genres = store.genres();

      if (action === 'asc') {
        patchState(store, {
          sortedGenres: [...genres].sort((a, b) => a.title.localeCompare(b.title)),
        });
      } else if (action === 'desc') {
        patchState(store, {
          sortedGenres: [...genres].sort((a, b) => b.title.localeCompare(a.title)),
        });
      } else {
        patchState(store, {
          sortedGenres: [...genres],
        });
      }
    },

    sortAuthors: (criterion: SortBy, order: SortOrder) => {
      const authors = store.authors();
      const sorted = [...authors];

      if (order !== 'none') {
        if (criterion === 'name') {
          sorted.sort((a, b) =>
            order === 'asc'
              ? a.lastName.localeCompare(b.lastName)
              : b.lastName.localeCompare(a.lastName)
          );
        } else if (criterion === 'books') {
          sorted.sort((a, b) =>
            order === 'asc' ? a.books.length - b.books.length : b.books.length - a.books.length
          );
        }
      }

      patchState(store, {
        sortedAuthors: sorted,
        sortCreterion: criterion,
        sortAction: order,
      });
    },

    setSearchTerm: (term: string) => {
      patchState(store, { searchTerm: term });
    },
  }))
);

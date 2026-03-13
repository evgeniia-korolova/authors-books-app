import { computed } from '@angular/core';
import { Author } from '../core/models/author.model';
import { Genre } from '../core/models/genre.model';
import { withStorageSync } from '@angular-architects/ngrx-toolkit';
import {
  patchState,
  signalMethod,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Book } from '../core/models/book.model';
import { SortOrder } from '../core/models/sort-order.type';
import { SortBy } from '../core/models/sort-by.type';
import { BookWithAuthor } from '../core/models/book-with-author.type';

export interface LibraryState {
  authors: Author[];
  sortedAuthors: Author[];
  genres: Genre[];
  selectedAuthorId: string | undefined;
  selectedGenre: string;
  sortAction: SortOrder;
  sortCreterion: SortBy;
  searchTerm: string;
  searchBookTerm: string;
  booksByCategory: BookWithAuthor[];
}

export const LibraryStore = signalStore(
  {
    providedIn: 'root',
  },
  withState({
    authors: [],
    sortedAuthors: [],
    genres: [
      { id: '0', title: 'All' },
      { id: '1', title: 'Poetry' },
      { id: '2', title: 'Novel' },
      { id: '3', title: 'Drama' },
    ],
    sortedGenres: [],
    selectedAuthorId: undefined,
    sortAction: 'none',
    sortCreterion: 'none',
    selectedGenre: 'All',
    searchTerm: '',
    searchBookTerm: '',
    booksByCategory: [],
  } as LibraryState),

  withStorageSync({
    key: 'library-store',
    select: ({ authors, genres }) => ({ authors, genres }),
  }),
  withComputed(
    ({
      authors,
      selectedAuthorId,      
      sortedAuthors,
      searchTerm,
      booksByCategory,
      searchBookTerm,
    }) => ({
      selectedAuthor: computed(() => authors().find((person) => person.id === selectedAuthorId())),
      selectedAuthorBooks: computed(
        () => authors().find((person) => person.id === selectedAuthorId())?.books ?? []
      ),

      filteredAuthors: computed(() => {
        const base = sortedAuthors().length ? sortedAuthors() : authors();
        const term = searchTerm().toLowerCase();

        return term
          ? base.filter((a) => `${a.firstName} ${a.lastName}`.toLowerCase().includes(term))
          : base;
      }),

      filteredBooks: () => {
        const base = booksByCategory();
        const term = searchBookTerm().toLowerCase();

        return term ? base.filter((b) => b.title.toLowerCase().includes(term)) : base;
      },
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

    selectGenre: (genre: string) => {
      patchState(store, { selectedGenre: genre });
      // const allBooks = store.authors().flatMap((author) => author.books);
      const allBooks = store.authors().flatMap((author) =>
        author.books.map((book) => ({
          ...book,
          authorName: `${author.firstName} ${author.lastName}`,
        }))
      );

      const booksByCategory =
        genre === 'All' ? allBooks : allBooks.filter((book) => book.genre.title === genre);

      patchState(store, { booksByCategory });
    },

    setSearchBookTerm: (term: string) => {
      patchState(store, { searchBookTerm: term });
    },
  })),
  withHooks({
    onInit(store) {
      const allBooks: BookWithAuthor[] = store.authors().flatMap((author) =>
        author.books.map((book) => ({
          ...book,
          authorName: `${author.firstName} ${author.lastName}`,
        }))
      );      
      patchState(store, { booksByCategory: allBooks });
    },
  })
);

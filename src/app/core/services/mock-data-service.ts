import { Injectable } from '@angular/core';
import { Author } from '../models/author.model';

@Injectable({
  providedIn: 'root',
})
export class MockDataService {
  getAuthors(): Author[] {
    return [
      {
        id: '1',
        lastName: 'Пушкин',
        firstName: 'Александр',
        middleName: 'Сергеевич',
        birthDate: new Date(1799, 5, 6),
        books: [
          { id: 'b1', title: 'Евгений Онегин', pages: 300, genreId: 'poetry' },
          { id: 'b2', title: 'Руслан и Людмила', pages: 150, genreId: 'poetry' },
        ],
      },
      {
        id: '2',
        lastName: 'Тургенев',
        firstName: 'Иван',
        middleName: 'Сергеевич',
        birthDate: new Date(1818, 10, 9),
        books: [{ id: 'b3', title: 'Отцы и дети', pages: 350, genreId: 'novel' }],
      },
    ];
  }
}

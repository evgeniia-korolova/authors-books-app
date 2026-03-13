import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenresBooksList } from './genres-books-list';

describe('GenresBooksList', () => {
  let component: GenresBooksList;
  let fixture: ComponentFixture<GenresBooksList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenresBooksList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenresBooksList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

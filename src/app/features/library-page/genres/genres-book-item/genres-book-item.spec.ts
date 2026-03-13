import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenresBookItem } from './genres-book-item';

describe('GenresBookItem', () => {
  let component: GenresBookItem;
  let fixture: ComponentFixture<GenresBookItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenresBookItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenresBookItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

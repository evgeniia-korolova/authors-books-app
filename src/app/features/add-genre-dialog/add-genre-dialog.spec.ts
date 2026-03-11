import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGenreDialog } from './add-genre-dialog';

describe('AddGenreDialog', () => {
  let component: AddGenreDialog;
  let fixture: ComponentFixture<AddGenreDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddGenreDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddGenreDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditBookDialog } from './add-edit-book-dialog';

describe('AddEditBookDialog', () => {
  let component: AddEditBookDialog;
  let fixture: ComponentFixture<AddEditBookDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditBookDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditBookDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

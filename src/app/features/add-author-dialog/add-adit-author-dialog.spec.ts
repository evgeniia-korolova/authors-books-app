import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditAuthorDialog } from './add-edit-author-dialog';

describe('AddAuthorDialog', () => {
  let component: AddEditAuthorDialog;
  let fixture: ComponentFixture<AddEditAuthorDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditAuthorDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditAuthorDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

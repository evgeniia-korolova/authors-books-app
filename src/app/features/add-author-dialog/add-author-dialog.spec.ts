import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAuthorDialog } from './add-author-dialog';

describe('AddAuthorDialog', () => {
  let component: AddAuthorDialog;
  let fixture: ComponentFixture<AddAuthorDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAuthorDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAuthorDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

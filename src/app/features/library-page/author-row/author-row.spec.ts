import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorRow } from './author-row';

describe('AuthorRow', () => {
  let component: AuthorRow;
  let fixture: ComponentFixture<AuthorRow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthorRow]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorRow);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

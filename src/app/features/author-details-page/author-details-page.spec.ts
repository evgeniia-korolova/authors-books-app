import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorDetailsPage } from './author-details-page';

describe('AuthorDetailsPage', () => {
  let component: AuthorDetailsPage;
  let fixture: ComponentFixture<AuthorDetailsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthorDetailsPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

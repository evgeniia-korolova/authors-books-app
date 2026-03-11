import { TestBed } from '@angular/core/testing';
import { UniqueBookValidatorService } from './unique-book-validator-service';



describe('UniqueBookValidatorService', () => {
  let service: UniqueBookValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UniqueBookValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

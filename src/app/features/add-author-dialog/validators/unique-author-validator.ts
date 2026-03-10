import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Author } from '../../../core/models/author.model';


export function uniqueAuthorValidator(store: { authors: () => Author[] }): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const { lastName, firstName, middleName } = control.value;
  
      const authors = store.authors(); // здесь store передан извне
  
      const exists = authors.some((a) => {
        const sameLast = a.lastName.trim().toLowerCase() === lastName.trim().toLowerCase();
        const sameFirst = a.firstName.trim().toLowerCase() === firstName.trim().toLowerCase();
  
        if (a.middleName && middleName) {
          return sameLast && sameFirst &&
                 a.middleName.trim().toLowerCase() === middleName.trim().toLowerCase();
        }
        return sameLast && sameFirst;
      });
  
      return exists ? { duplicateAuthor: true } : null;
    };
  }
  
  


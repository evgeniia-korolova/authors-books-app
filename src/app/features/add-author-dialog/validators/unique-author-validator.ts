import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Author } from '../../../core/models/author.model';

export function uniqueAuthorValidator(store: { authors: () => Author[] }): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const { lastName, firstName, middleName, birthDate } = control.value;

    const authors = store.authors();

    const normalizeDate = (val: string | Date | undefined | null): string => {
      if (!val) return '';
      const d = new Date(val);
      return isNaN(d.getTime()) ? '' : d.toISOString().substring(0, 10);
    };

    const exists = authors.some((a) => {
      const sameLast = a.lastName.trim().toLowerCase() === lastName.trim().toLowerCase();
      const sameFirst = a.firstName.trim().toLowerCase() === firstName.trim().toLowerCase();
      const sameMiddle =
        (a.middleName ?? '').trim().toLowerCase() === (middleName ?? '').trim().toLowerCase();
      const sameBirth = normalizeDate(a.birthDate) === normalizeDate(birthDate);

      return sameLast && sameFirst && sameMiddle && sameBirth;
    });

    return exists ? { duplicateAuthor: true } : null;
  };
}

import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Genre } from '../../../core/models/genre.model';

export function uniqueGenreValidator(store: { genres: () => Genre[] }): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value ?? {};
    const title = typeof value.title === 'string' ? value.title : '';

    if (!title) {
      return null;
    }

    const genres = store.genres();

    const exists = genres.some(
      (g) => (g.title ?? '').trim().toLowerCase() === title.trim().toLowerCase()
    );

    return exists ? { duplicateGenre: true } : null;
  };
}

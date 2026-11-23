import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, catchError, map, of, switchMap, timer } from 'rxjs';
import { ElementsService } from '../services/elements.service';

/**
 * Validador asíncron: el terme ha de coincidir amb algun element de l'API.
 * Error retornat: { senseResultats: true }
 */
export function termeAmbResultatsValidator(elementsService: ElementsService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const terme = (control.value ?? '').toString().trim();

    // Termes curts o buits: no consultem l'API (ja els atura la validació síncrona)
    if (terme.length < 3) {
      return of(null);
    }

    return timer(400).pipe(
      switchMap(() => elementsService.comptarResultats(terme)),
      map((total) => (total > 0 ? null : { senseResultats: true })),
      catchError(() => of(null))   // si l'API falla, no bloquegem el formulari
    );
  };
}
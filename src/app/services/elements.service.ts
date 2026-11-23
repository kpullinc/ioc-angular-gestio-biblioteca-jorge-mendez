import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Service, Injectable, inject, signal } from '@angular/core';
import { Observable, Subject, catchError, map, of, switchMap, tap } from 'rxjs';
import { ElementApiResponse } from '../models/element-api.model';
import { ElementBiblioteca, EstatElements, GenereElement, NouElement } from '../models/element.model';
import { adaptarElementsApi, prepararElementApi, adaptarElementApi } from '../adaptadors/element.adaptador';
import { environment } from '../../environments/environment';

//@Injectable({ providedIn: 'root' })

export interface CriterisCerca {
  terme: string;
  genere: GenereElement | '';   // '' = totes les categories
}

@Service()

export class ElementsService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/llibres`;


  private readonly criterisInicials: CriterisCerca = { terme: '', genere: '' };
  private readonly criteris$ = new Subject<CriterisCerca>();
  private darrersCriteris = this.criterisInicials;

  private readonly estatSignal = signal<EstatElements>({ estat: 'inicial', elements: [] });
  readonly estat = this.estatSignal.asReadonly();

  constructor() {
    this.criteris$.pipe(
      tap((criteris) => {
        this.darrersCriteris = criteris;
        this.estatSignal.set({ estat: 'carregant', elements: [] });
      }),
      // switchMap cancel·la la petició anterior si arriben criteris nous abans que acabi
      switchMap((criteris) => this.obtenirElements(criteris).pipe(
        map((elements): EstatElements => ({ estat: 'exit', elements })),
        catchError((error: HttpErrorResponse) => of<EstatElements>({
          estat: 'error',
          elements: [],
          error: this.gestionarError(error),
        }))
      ))
    ).subscribe((estat) => this.estatSignal.set(estat));
  }

    /** Carrega tots els elements */
  carregarTot(): void {
    this.cercar(this.criterisInicials);
  }

   /** Emet criteris nous: el flux del constructor fa la petició */
  cercar(criteris: CriterisCerca): void {
    this.criteris$.next({
      terme: criteris.terme.trim(),
      genere: criteris.genere,
    });    
  }
  //Crea un element nou amb POST i, si va bé, refresca el llistat 
  crearElement(nou: NouElement): Observable<ElementBiblioteca> {
    return this.http.post<ElementApiResponse>(this.apiUrl, prepararElementApi(nou)).pipe(
      tap(() => this.reintentar()), // el libro ya se ha guardado, refrescamos la lista
      map((api) => {
      const element = adaptarElementApi(api);
      if (!element) {
        throw new Error('La resposta de l\'API no és vàlida');
      }
      return element;
    })
      //tap(() => this.reintentar())
    );
  }
  reintentar(): void {
    this.criteris$.next(this.darrersCriteris);
  }

  /** Nombre de resultats per a un terme (per al validador asíncron) */
  comptarResultats(terme: string): Observable<number> {
    return this.obtenirElements({ terme, genere: '' }).pipe(
      map((elements) => elements.length)
    );
  }

  private obtenirElements(criteris: CriterisCerca): Observable<ElementBiblioteca[]> {
    let params = new HttpParams();
    if (criteris.genere) {
      params = params.set('categoria', criteris.genere);
    }

    return this.http.get<ElementApiResponse[]>(this.apiUrl, { params }).pipe(
      map(adaptarElementsApi),
      map((elements) => this.filtrarPerTerme(elements, criteris.terme))
    );
  }
  private filtrarPerTerme(elements: ElementBiblioteca[], terme: string): ElementBiblioteca[] {
    const text = terme.trim().toLocaleLowerCase('ca');
    if (text.length < 3) {
      return elements;
    }
    return elements.filter((element) =>
      `${element.titol} ${element.descripcio}`.toLocaleLowerCase('ca').includes(text)
    );
  }

  private gestionarError(error: HttpErrorResponse): string {
    switch (error.status) {
      case 0:
        return 'No es pot connectar amb l\'API. Comproveu que npm run api està actiu.';
      case 404:
        return 'Recurs no trobat. Verifiqueu la URL de l\'API.';
      case 500:
        return 'Error intern del servidor.';
      default:
        return `Error inesperat (${error.status}): ${error.message}`;
    }
  }

  getElements(): Observable<ElementBiblioteca[]> {
    return this.http
      .get<ElementApiResponse[]>(this.apiUrl)
      .pipe(map(adaptarElementsApi));
  }
      
}

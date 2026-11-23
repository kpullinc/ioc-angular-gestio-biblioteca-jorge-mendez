import { Service, signal } from '@angular/core';
import { CercaDesada, GENERES, GenereElement } from '../models/element.model';

@Service()
export class HistorialCerquesService {
  private readonly clauStorage = 'cataleg-historial-cerques';
  private readonly historialSignal = signal<CercaDesada[]>(this.llegir());

  readonly historial = this.historialSignal.asReadonly();

  desar(terme: string, genere: GenereElement| ''): void {
    const termeNormalitzat = terme.trim();
    if (termeNormalitzat.length < 3) {
      return;
    }

    const novaCerca: CercaDesada = {
      terme: termeNormalitzat,
      genere,
      data: new Date().toISOString(),
    };
    const anterior = this.historialSignal()[0];

    if (anterior?.terme === novaCerca.terme && anterior.genere === novaCerca.genere) {
      return;
    }

    this.historialSignal.update((historial) => [novaCerca, ...historial].slice(0, 8));
    this.escriure();
  }

  netejar(): void {
    this.historialSignal.set([]);
    this.escriure();
  }

  private llegir(): CercaDesada[] {
    try {
      const dades = localStorage.getItem(this.clauStorage);
      const historial: unknown = dades ? JSON.parse(dades) : [];

      if (!Array.isArray(historial)) {
        return [];
      }

      return historial.filter((cerca): cerca is CercaDesada =>
        typeof cerca?.terme === 'string' &&
        typeof cerca?.categoria === 'string' &&
        typeof cerca?.data === 'string'
      );
    } catch {
      return [];
    }
  }

  private escriure(): void {
    try {
      localStorage.setItem(this.clauStorage, JSON.stringify(this.historialSignal()));
    } catch {
      // La cerca continua funcionant encara que el navegador no permeti persistir-la.
    }
  }
}
export type GenereElement = 'teatre' | 'novela' | 'poesia' | 'terror';

export interface Element {
  id: number;
  titol: string;
  descripcio: string;
  genere: GenereElement;
  dataPublicacio: string;   
  valoracioLectors: number; 
  disponible?: boolean;
}


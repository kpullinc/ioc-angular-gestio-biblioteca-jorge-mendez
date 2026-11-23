export interface ElementApi {}

export interface ElementApiResponse {
  id: number;
  titol: string;
  descripcio: string;
  categoria: string;
  dataPublicacio: string; 
  imatge?: string;
  valoracioLectors: number; 
  esDisponible?: boolean;
}
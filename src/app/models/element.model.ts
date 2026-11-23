import { ElementApiResponse } from "./element-api.model";
export const GENERES = ['teatre', 'terror', 'novela', 'poesia'] as const;
export type GenereElement = (typeof GENERES)[number];
export type EstatServei = 'inicial' | 'carregant' | 'exit' | 'error';
//export type NouElement = Pick<ElementBiblioteca, 'titol' | 'descripcio' | 'genere' | 'imatge' | 'disponible' | 'dataPublicacio'>;

export interface ElementBiblioteca {
  id: number;
  titol: string;
  descripcio: string;
  genere: GenereElement;
  dataPublicacio: Date;  
  imatge?: string; 
  valoracioLectors: number; 
  disponible?: boolean;
  dataAfegit: Date;
}


export interface ElementsCercaResponse {
  elements: ElementApiResponse[];
  total: number;
}

export interface EstatElements {
  estat: EstatServei;
  elements: ElementBiblioteca[];
  error?: string;
}
export interface NouElement{
  titol: string;
  descripcio: string;
  genere: GenereElement;
  imatge?: string;
  disponible: boolean;
  dataPublicacio: string; // ISO 8601 (aaaa-mm-dd)
  valoracioLectors?: number;
} 

//Darrera part exercici 4
export interface CercaDesada {
  terme: string;
  genere: GenereElement | '';
  data: string;   // ISO 8601, moment en què es va fer
}
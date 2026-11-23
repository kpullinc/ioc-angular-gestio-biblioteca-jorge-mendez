import { ElementBiblioteca, GENERES, GenereElement, NouElement } from '../models/element.model';
import { ElementApiResponse } from '../models/element-api.model';
/*
const GENERES_NORMALITZATS: Record<string, string> = {
  poesia: 'Poesia',
  teatre: 'Teatre',
  novela: 'Novela',
  terror: 'Terror'
};
*/
const IMATGE_PER_DEFECTE = 'https://placehold.co/300x200';

export function elementBuit(): ElementBiblioteca {
  return {
    id: 0,  //no tinc gens clar que ficar un 0 aquí sigui bona idea...
    titol: '',
    descripcio: '',
    genere: GENERES[0],
    valoracioLectors: 0,
    imatge: IMATGE_PER_DEFECTE,
    disponible: false,
    dataPublicacio: new Date('0000-01-01T00:00:00Z'),//trobat a internet, per ficar que es va publicar a l'any 0000-00-01)
    dataAfegit: new Date(),
  };
}
/*
function normalitzaGenere(genere: string | undefined): string {
  const neta = (genere ?? '').trim();
  return GENERES_NORMALITZATS[neta.toLocaleLowerCase()] ?? neta;
}
*/


function normalitzaGenere(genere: string | undefined): GenereElement | undefined {
  const neta = (genere ?? '').trim().toLocaleLowerCase('ca');
  return GENERES.find((g) => g.toLocaleLowerCase('ca') === neta);
}

function numeroSegur(valor: unknown, perDefecte = 0): number {
  const n = Number(valor);
  return Number.isFinite(n) ? n : perDefecte;
};

export function adaptarElementApi(apiElement: ElementApiResponse): ElementBiblioteca | undefined{
  
  const id = Number(apiElement.id); 
  const titol= (apiElement.titol ?? '').trim();
  const descripcio= (apiElement.descripcio ?? '').trim();
     
  const genere = normalitzaGenere(apiElement.categoria);
  //Ens ve la data en format ISO i la afegim a les nostres dades canviant en tipus i assegurant que no hi ha espais buits  
  const dataPublicacio = new Date((apiElement.dataPublicacio ?? '').trim());
  // valor per defecte si falta
  const imatge = apiElement.imatge ?? 'assets/placeholder.png';
  const disponible= apiElement.esDisponible === true;
  //convertir valors numérics amb seguretat 
  const valoracioLectors= numeroSegur(apiElement.valoracioLectors);
  //ho he inclos sobre la marxa, ho he vist als apunts i m'ha semblat interessant
  const dataAfegit= new Date()      
  // Descartem registres que no podem representar correctament
  if (!genere || Number.isNaN(dataPublicacio.getTime())) {
    console.warn('Registre descartat per dades invàlides:', apiElement);
    return undefined;
  }
  return {
    id,    
    titol,
    descripcio,
    genere,
    dataPublicacio,    
    imatge,
    disponible,
    valoracioLectors,   
    dataAfegit,      
  };
}

export function adaptarElementsApi(apiElements: ElementApiResponse[]): ElementBiblioteca[] {
  return apiElements
    .map(adaptarElementApi)
    .filter((e): e is ElementBiblioteca => e !== undefined);
};

export function prepararElementApi(nou: NouElement): Omit<ElementApiResponse, 'id'> {
  return {
    titol: nou.titol.trim(),
    descripcio: nou.descripcio.trim(),
    categoria: nou.genere,
    dataPublicacio: nou.dataPublicacio,
    imatge: nou.imatge?.trim() || `https://placehold.co/300x200?text=${encodeURIComponent(nou.titol.trim())}`,    
    valoracioLectors: Number(nou.valoracioLectors),
    esDisponible: nou.disponible,
  };
}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BarraFiltresComponent, FiltresElement } from './components/barra-filtres/barra-filtres.component';
import { LlistaElementsComponent } from './components/llista-elements/llista-elements.component';
import { ELEMENTS_MOCK } from './mocks/dades-mocks';
import { Element } from './models/element.model';

@Component({
  imports: [RouterOutlet, BarraFiltresComponent, LlistaElementsComponent],
  selector: 'app-root',
  styleUrl: './app.component.scss',
  templateUrl: './app.component.html',
})
export class App {
  elements: Element[] = ELEMENTS_MOCK;
  elementsFiltrats: Element[] = ELEMENTS_MOCK;
  elementSeleccionat: Element | undefined = undefined;
  filtresActuals: FiltresElement = { text: '', genere: 'Totes' };

  actualitzaFiltres(filtres: FiltresElement): void {
    this.filtresActuals = filtres;
    const text = filtres.text.trim().toLocaleLowerCase('ca');

    this.elementsFiltrats = this.elements.filter((element) => {
      const genereCoincideix = filtres.genere === 'Totes' || element.genere === filtres.genere;
      const textCoincideix = text === '' || this.conteText(element, text);
      return genereCoincideix && textCoincideix;
    });

    // Si l'element seleccionat ha quedat fora del filtre, tanquem el detall
    if (this.elementSeleccionat && !this.elementsFiltrats.includes(this.elementSeleccionat)) {
      this.elementSeleccionat = undefined;
    }
  }

  seleccionaElement(element: Element): void {
    this.elementSeleccionat = element;
  }

  tancaDetall(): void {
    this.elementSeleccionat = undefined;
  }

  private conteText(element: Element, text: string): boolean {
    const contingut = `${element.titol} ${element.descripcio}`.toLocaleLowerCase('ca');
    return contingut.includes(text);
  }
}
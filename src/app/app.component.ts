import { Component } from '@angular/core';
import { TargetaElementComponent } from './components/targeta-element/targeta-element.component';
import { Element } from './models/element.model';

@Component({
  imports: [TargetaElementComponent],
  selector: 'app-root',
  styleUrl: './app.component.scss',
  templateUrl: './app.component.html',
})
export class App {
  elementProva: Element = {
    id: 1,
    titol: 'Element de prova',
    descripcio: 'Descripció d\'exemple per verificar la targeta',
    genere: 'terror',
    dataPublicacio: '2026-09-10',
    valoracioLectors: 4.5,
    disponible: true,
  };

  mostraSeleccio(element: Element): void {
    console.log('Seleccionat:', element.titol);
  }
}
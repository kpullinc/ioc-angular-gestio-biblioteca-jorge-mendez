import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GenereElement } from '../../models/element.model';

export interface FiltresElement {
  text: string;
  genere: GenereElement | 'Tots';
}

@Component({
  imports: [FormsModule],
  selector: 'app-barra-filtres',
  styleUrl: './barra-filtres.component.scss',
  templateUrl: './barra-filtres.component.html',
})
export class BarraFiltresComponent {
  @Output() filtresCanviats = new EventEmitter<FiltresElement>();

  generes: Array<GenereElement | 'Tots'> = ['Tots', 'terror', 'novela', 'teatre', 'poesia'];

  filtres: FiltresElement = {
    text: '',
    genere: 'Tots',
  };

  aplicaFiltres(): void {
    this.filtresCanviats.emit({ ...this.filtres });
  }

  restableixFiltres(): void {
    this.filtres = { text: '', genere: 'Tots' };
    this.aplicaFiltres();
  }
}

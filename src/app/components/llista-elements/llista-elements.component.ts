import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ElementBiblioteca } from '../../models/element.model';
import { TargetaElementComponent } from '../targeta-element/targeta-element.component';

@Component({
  imports: [TargetaElementComponent],
  selector: 'app-llista-elements',
  styleUrl: './llista-elements.component.scss',
  templateUrl: './llista-elements.component.html',
})
export class LlistaElementsComponent {
  @Input({ required: true }) elements!: ElementBiblioteca[];
  @Input() elementSeleccionatId?: number; // mismo tipo que ElementBiblioteca.id
  @Output() selecciona = new EventEmitter<ElementBiblioteca>();

  propagaSeleccio(element: ElementBiblioteca): void {
    this.selecciona.emit(element);
  }

//****

//
}

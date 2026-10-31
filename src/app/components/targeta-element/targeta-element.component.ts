import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Element } from '../../models/element.model';
import { EtiquetaElementComponent } from '../etiqueta-element/etiqueta-element.component';

@Component({
  imports: [DatePipe, EtiquetaElementComponent],
  selector: 'app-targeta-element',
  styleUrl: './targeta-element.component.scss',
  templateUrl: './targeta-element.component.html',
})
export class TargetaElementComponent {
  @Input({ required: true }) element!: Element;
  @Input() seleccionada = false;
  @Output() selecciona = new EventEmitter<Element>();

  avisaSeleccio(): void {
    this.selecciona.emit(this.element);
  }
}
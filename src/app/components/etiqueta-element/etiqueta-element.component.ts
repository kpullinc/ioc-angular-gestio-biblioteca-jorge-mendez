import { Component, Input } from '@angular/core';
import { GenereElement } from '../../models/element.model';

@Component({
  imports: [],
  selector: 'app-etiqueta-element',
  styleUrl: './etiqueta-element.component.scss',
  templateUrl: './etiqueta-element.component.html',
})
export class EtiquetaElementComponent {
  @Input({ required: true }) genere!: GenereElement;
  @Input() disponible = false;
}
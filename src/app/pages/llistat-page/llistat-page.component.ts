import { Component, OnInit, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { CriterisCerca, ElementsService } from '../../services/elements.service';
import { FormulariNouElementComponent } from '../../components/formulari-nou-element/formulari-nou-element.component';
import { FormulariCercaComponent } from '../../components/formulari-cerca/formulari-cerca.component';
@Component({
  imports: [FormulariCercaComponent, FormulariNouElementComponent],
  selector: 'app-cataleg-page',
  styleUrl: './llistat-page.component.scss',
  templateUrl: './llistat-page.component.html',
})
export class LlistatPageComponent implements OnInit {
  readonly elementService = inject(ElementsService);

  ngOnInit(): void {
    this.elementService.carregarTot();
  }
  onCerca(criteris: CriterisCerca): void {
    this.elementService.cercar(criteris);
  }
  reintentar(): void {
    this.elementService.reintentar();
  }
}

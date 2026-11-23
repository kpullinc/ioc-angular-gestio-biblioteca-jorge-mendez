import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { CriterisCerca, ElementsService } from '../../services/elements.service';
import { termeAmbResultatsValidator } from '../../validadors/terme-amb-resultats.validator';
import { GENERES, GenereElement } from '../../models/element.model';

//cerques, exercici 4
import { HistorialCerquesService, } from '../../services/historial-cerques.service';
import { CercaDesada } from '../../models/element.model';


@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-formulari-cerca',
  styleUrl: './formulari-cerca.component.scss',
  templateUrl: './formulari-cerca.component.html',
})
export class FormulariCercaComponent {
  private readonly elementsService = inject(ElementsService);
  readonly historial = inject(HistorialCerquesService);  

  @Output() cercaEnviada = new EventEmitter<CriterisCerca>();
  readonly generes = GENERES;

  //generes = new FormControl<GenereElement | ''>('', { nonNullable: true });

  readonly formulari = new FormGroup({
    terme: new FormControl('', {
      nonNullable: true,
      validators: [Validators.minLength(3)],
      asyncValidators: [termeAmbResultatsValidator(this.elementsService)],
    }),
    genere: new FormControl<GenereElement | ''>('', { nonNullable: true }),
  });

  enviar(): void {
    if (this.formulari.invalid) {
      this.formulari.markAllAsTouched();
      return;
    }
    const criteris = this.formulari.getRawValue();
    this.historial.desar(criteris.terme, criteris.genere);
    this.emetre();
  }

  recuperar(cerca: CercaDesada): void {
    this.formulari.patchValue({ terme: cerca.terme, genere: cerca.genere });
 this.enviar();
  }

  
  netejar(): void {
    this.formulari.reset();
    this.emetre();
  }

  private emetre(): void {
    this.cercaEnviada.emit(this.formulari.getRawValue());
  }

  get terme(): FormControl<string> {
    return this.formulari.controls.terme;
  }

  get mostrarErrors(): boolean {
    return this.terme.invalid && (this.terme.dirty || this.terme.touched);
  }

  get missatgeError(): string {
    if (this.terme.hasError('minlength')) {
      return 'Escriviu 3 caràcters com a mínim.';
    }
    if (this.terme.hasError('senseResultats')) {
      return 'Cap element coincideix amb aquest terme.';
    }
    return '';
  }
}
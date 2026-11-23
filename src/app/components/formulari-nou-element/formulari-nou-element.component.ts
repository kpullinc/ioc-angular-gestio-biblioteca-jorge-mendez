import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ElementsService } from '../../services/elements.service';
import { GENERES, GenereElement, NouElement } from '../../models/element.model';

// Valida que el valor sigui una data ISO (aaaa-mm-dd) que existeixi de veritat
//Amb ajuda de IA, no tenia ni idea de com fer que validés una data
export function fechaValida(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const v = control.value;
    if (!v) return null; // required s'encarrega del buit

    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v);
    if (!m) return { formatInvalid: true };

    const [a, mes, d] = [Number(m[1]), Number(m[2]), Number(m[3])];
    const data = new Date(a, mes - 1, d);
    const existeix =
      data.getFullYear() === a && data.getMonth() === mes - 1 && data.getDate() === d;

    return existeix ? null : { dataInvalida: true };
  };
}

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-formulari-nou-element',
  styleUrl: './formulari-nou-element.component.scss',
  templateUrl: './formulari-nou-element.component.html',
})
export class FormulariNouElementComponent {
  private readonly elementService = inject(ElementsService);

  readonly generes = GENERES;

  readonly formulari = new FormGroup({
    titol: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3)] }),
    descripcio: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(10)] }),
    genere: new FormControl<GenereElement>('novela', { nonNullable: true, validators: [Validators.required] }),
    valoracioLectors: new FormControl(0, { nonNullable: true, validators: [Validators.required, Validators.min(0.01)] }),
    //stock: new FormControl(1, { nonNullable: true, validators: [Validators.required, Validators.min(0)] }),
    dataPublicacio: new FormControl('', { nonNullable: true, validators: [Validators.required, fechaValida()] }),
    disponible: new FormControl(true, { nonNullable: true }), 
  });


    // Estat de l'enviament (canvia dins d'una resposta HTTP: per això és un signal)
  readonly enviant = signal(false);
  readonly missatge = signal<string | null>(null);
  readonly error = signal<string | null>(null);

  crear(): void {
    if (this.formulari.invalid) {
      this.formulari.markAllAsTouched();
      return;
    }

    this.enviant.set(true);
    this.missatge.set(null);
    this.error.set(null);

    this.elementService.crearElement(this.formulari.getRawValue()).subscribe({
      next: (element) => {
        this.missatge.set(`S'ha creat "${element.titol}" amb l'identificador ${element.id}.`);
        this.formulari.reset();
        this.enviant.set(false);
      },
      error: () => {
        this.error.set('No s\'ha pogut crear l\'element. Comproveu que l\'API està activa.');
        this.enviant.set(false);
      },
    });
  }

  teError(control: keyof typeof this.formulari.controls): boolean {
    const c = this.formulari.controls[control];
    return c.invalid && (c.dirty || c.touched);
  }
  
}
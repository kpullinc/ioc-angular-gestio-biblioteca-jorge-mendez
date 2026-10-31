import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EtiquetaElement } from './etiqueta-element.component';

describe('EtiquetaElement', () => {
  let component: EtiquetaElement;
  let fixture: ComponentFixture<EtiquetaElement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtiquetaElement],
    }).compileComponents();

    fixture = TestBed.createComponent(EtiquetaElement);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

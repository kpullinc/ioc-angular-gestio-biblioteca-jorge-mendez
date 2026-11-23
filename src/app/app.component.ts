import { Component } from '@angular/core';
import { LlistatPageComponent } from './pages/llistat-page/llistat-page.component';

@Component({
  imports: [LlistatPageComponent],
  selector: 'app-root',
  styleUrl: './app.component.scss',
  templateUrl: './app.component.html',
})
export class App {}
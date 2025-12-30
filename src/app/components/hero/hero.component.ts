import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent {
  readonly lines: string[] = [
    'Valiente cuando el mundo pide silencio.',
    'Hermosa por decisión: elegancia en cada paso.',
    'Exitosa por disciplina: metas claras, ejecución impecable.'
  ];
}

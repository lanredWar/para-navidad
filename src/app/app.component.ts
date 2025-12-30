import { Component } from '@angular/core';

import { HeroComponent } from './components/hero/hero.component';
import { ChartsComponent } from './components/charts/charts.component';
import { ChristmasComponent } from './components/christmas/christmas.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeroComponent, ChartsComponent, ChristmasComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {}

import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-charts',
  standalone: true,
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('radarCanvas') radarCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('barCanvas') barCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('donutCanvas') donutCanvas!: ElementRef<HTMLCanvasElement>;

  private charts: Chart[] = [];

  ngAfterViewInit(): void {
    const css = getComputedStyle(document.documentElement);
    const cDeep = css.getPropertyValue('--blue-deep').trim() || '#5f6e7f';
    const cSoft = css.getPropertyValue('--blue-soft').trim() || '#89a3c1';
    const cPink = css.getPropertyValue('--pink').trim() || '#f6b7bc';
    const cPinkSoft = css.getPropertyValue('--pink-soft').trim() || '#f8e4e5';

    // Radar: atributos (narrativo)
    this.charts.push(
      new Chart(this.radarCanvas.nativeElement, {
        type: 'radar',
        data: {
          labels: ['Valentía', 'Disciplina', 'Creatividad', 'Liderazgo', 'Empatía', 'Resiliencia'],
          datasets: [
            {
              label: 'Fortaleza integral',
              data: [92, 88, 84, 86, 90, 94],
              borderColor: cDeep,
              backgroundColor: this.alpha(cSoft, 0.25),
              pointBackgroundColor: cPink
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { labels: { color: cDeep } }
          },
          scales: {
            r: {
              suggestedMin: 0,
              suggestedMax: 100,
              angleLines: { color: this.alpha(cDeep, 0.12) },
              grid: { color: this.alpha(cDeep, 0.12) },
              pointLabels: { color: cDeep },
              ticks: {
                color: cDeep,
                backdropColor: 'transparent'
              }
            }
          }
        }
      })
    );

    // Bar: hitos
    this.charts.push(
      new Chart(this.barCanvas.nativeElement, {
        type: 'bar',
        data: {
          labels: ['Proyectos', 'Certificaciones', 'Impacto', 'Mentoría', 'Salud', 'Balance'],
          datasets: [
            {
              label: 'Avance anual (0-100)',
              data: [86, 78, 82, 74, 67, 72],
              backgroundColor: [
                this.alpha(cPink, 0.75),
                this.alpha(cSoft, 0.75),
                this.alpha(cPinkSoft, 0.85),
                this.alpha(cDeep, 0.65),
                this.alpha(cSoft, 0.55),
                this.alpha(cPink, 0.55)
              ],
              borderRadius: 14
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { labels: { color: cDeep } }
          },
          scales: {
            x: { ticks: { color: cDeep }, grid: { display: false } },
            y: {
              beginAtZero: true,
              max: 100,
              ticks: { color: cDeep },
              grid: { color: this.alpha(cDeep, 0.10) }
            }
          }
        }
      })
    );

    // Doughnut: enfoque
    this.charts.push(
      new Chart(this.donutCanvas.nativeElement, {
        type: 'doughnut',
        data: {
          labels: ['Carrera', 'Relaciones', 'Aprendizaje', 'Descanso'],
          datasets: [
            {
              label: 'Distribución del enfoque',
              data: [42, 26, 20, 12],
              backgroundColor: [
                this.alpha(cDeep, 0.85),
                this.alpha(cPink, 0.85),
                this.alpha(cSoft, 0.85),
                this.alpha(cPinkSoft, 0.95)
              ],
              borderColor: this.alpha('#ffffff', 0.7),
              borderWidth: 2
            }
          ]
        },
        options: {
          cutout: '68%',
          plugins: {
            legend: { position: 'bottom', labels: { color: cDeep } },
            tooltip: { enabled: true }
          }
        }
      })
    );
  }

  ngOnDestroy(): void {
    for (const c of this.charts) c.destroy();
    this.charts = [];
  }

  private alpha(hexOrRgb: string, a: number): string {
    // Accepts hex like #rrggbb.
    const hex = hexOrRgb.trim();
    if (!hex.startsWith('#') || (hex.length !== 7 && hex.length !== 4)) return hex;
    const full = hex.length === 4
      ? `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`
      : hex;
    const r = parseInt(full.slice(1, 3), 16);
    const g = parseInt(full.slice(3, 5), 16);
    const b = parseInt(full.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }
}

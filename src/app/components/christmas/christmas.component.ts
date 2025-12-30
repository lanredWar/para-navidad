import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';

declare global {
  interface Window {
    renderChristmasTree?: (container: HTMLElement) => { destroy: () => void };
  }
}

@Component({
  selector: 'app-christmas',
  standalone: true,
  templateUrl: './christmas.component.html',
  styleUrls: ['./christmas.component.css']
})
export class ChristmasComponent implements AfterViewInit, OnDestroy {
  @ViewChild('treeHost') treeHost!: ElementRef<HTMLElement>;
  private teardown: (() => void) | null = null;

  ngAfterViewInit(): void {
    const api = window.renderChristmasTree?.(this.treeHost.nativeElement);
    this.teardown = api?.destroy ?? null;
  }

  ngOnDestroy(): void {
    this.teardown?.();
    this.teardown = null;
  }
}

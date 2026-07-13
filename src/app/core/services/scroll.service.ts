import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ScrollService {
  #document = inject(DOCUMENT);
  #platformId = inject(PLATFORM_ID);
  #observer?: IntersectionObserver;

  readonly activeSection = signal<string>('home');

  observeSections(sectionIds: readonly string[]): void {
    if (!isPlatformBrowser(this.#platformId)) {
      return;
    }

    this.#observer?.disconnect();
    this.#observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          this.activeSection.set(visible.target.id);
        }
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    for (const id of sectionIds) {
      const element = this.#document.getElementById(id);
      if (element) {
        this.#observer.observe(element);
      }
    }
  }

  scrollToSection(id: string): void {
    if (!isPlatformBrowser(this.#platformId)) {
      return;
    }
    this.#document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

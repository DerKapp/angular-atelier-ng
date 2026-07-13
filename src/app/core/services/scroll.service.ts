import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';

/** Distance from the top of the viewport used as the "active" trigger line. */
const TOP_OFFSET_PX = 120;
/** How close to the bottom of the page counts as "scrolled to the end". */
const BOTTOM_THRESHOLD_PX = 2;

@Injectable({ providedIn: 'root' })
export class ScrollService {
  #document = inject(DOCUMENT);
  #platformId = inject(PLATFORM_ID);
  #abortController?: AbortController;
  #sectionIds: readonly string[] = [];
  #ticking = false;

  readonly activeSection = signal<string>('home');

  observeSections(sectionIds: readonly string[]): void {
    if (!isPlatformBrowser(this.#platformId)) {
      return;
    }

    this.#abortController?.abort();
    this.#sectionIds = sectionIds;

    const window = this.#document.defaultView;
    if (!window) {
      return;
    }

    this.#abortController = new AbortController();
    const { signal } = this.#abortController;
    const onScroll = (): void => this.#requestUpdate();
    window.addEventListener('scroll', onScroll, { passive: true, signal });
    window.addEventListener('resize', onScroll, { signal });

    this.#updateActiveSection();
  }

  #requestUpdate(): void {
    if (this.#ticking) {
      return;
    }
    this.#ticking = true;
    this.#document.defaultView?.requestAnimationFrame(() => {
      this.#ticking = false;
      this.#updateActiveSection();
    });
  }

  #updateActiveSection(): void {
    const window = this.#document.defaultView;
    if (!window || this.#sectionIds.length === 0) {
      return;
    }

    const scrolledToBottom =
      window.innerHeight + window.scrollY >=
      this.#document.documentElement.scrollHeight - BOTTOM_THRESHOLD_PX;
    if (scrolledToBottom) {
      this.activeSection.set(this.#sectionIds[this.#sectionIds.length - 1]);
      return;
    }

    let current = this.#sectionIds[0];
    for (const id of this.#sectionIds) {
      const element = this.#document.getElementById(id);
      if (element && element.getBoundingClientRect().top <= TOP_OFFSET_PX) {
        current = id;
      }
    }
    this.activeSection.set(current);
  }

  scrollToSection(id: string): void {
    if (!isPlatformBrowser(this.#platformId)) {
      return;
    }
    this.#document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

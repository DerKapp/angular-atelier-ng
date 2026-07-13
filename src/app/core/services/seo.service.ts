import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SITE_URL } from '../config/app.constants';

export interface PageSeo {
  title: string;
  description: string;
  path: string;
  image?: string;
}

const DEFAULT_OG_IMAGE = `${SITE_URL}/images/illustrations/hero.png`;

@Injectable({ providedIn: 'root' })
export class SeoService {
  #title = inject(Title);
  #meta = inject(Meta);
  #document = inject(DOCUMENT);

  setPage(page: PageSeo): void {
    const url = `${SITE_URL}${page.path}`;
    const image = page.image ?? DEFAULT_OG_IMAGE;

    this.#title.setTitle(page.title);
    this.#meta.updateTag({ name: 'description', content: page.description });
    this.#meta.updateTag({ property: 'og:title', content: page.title });
    this.#meta.updateTag({ property: 'og:description', content: page.description });
    this.#meta.updateTag({ property: 'og:type', content: 'website' });
    this.#meta.updateTag({ property: 'og:url', content: url });
    this.#meta.updateTag({ property: 'og:image', content: image });
    this.#updateCanonical(url);
  }

  #updateCanonical(url: string): void {
    let link: HTMLLinkElement | null = this.#document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = this.#document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.#document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }
}

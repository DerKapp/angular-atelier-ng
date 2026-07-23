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
    this.#updateHreflangAlternates(page.path);
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

  // German lives at the site root, English under /en — see angular.json's i18n.locales
  // config. x-default points at the German root as the language-neutral fallback.
  #updateHreflangAlternates(path: string): void {
    const alternates: Record<string, string> = {
      de: `${SITE_URL}${path}`,
      en: `${SITE_URL}/en${path}`,
      'x-default': `${SITE_URL}${path}`,
    };

    for (const [hreflang, href] of Object.entries(alternates)) {
      let link: HTMLLinkElement | null = this.#document.querySelector(
        `link[rel="alternate"][hreflang="${hreflang}"]`,
      );
      if (!link) {
        link = this.#document.createElement('link');
        link.setAttribute('rel', 'alternate');
        link.setAttribute('hreflang', hreflang);
        this.#document.head.appendChild(link);
      }
      link.setAttribute('href', href);
    }
  }
}

import { AfterViewInit, ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Hero } from './sections/hero/hero';
import { Services } from './sections/services/services';
import { Pricing } from './sections/pricing/pricing';
import { AboutUs } from './sections/about-us/about-us';
import { BlogTeaser } from './sections/blog-teaser/blog-teaser';
import { ContactForm } from './sections/contact/contact-form';
import { ScrollService } from '../../core/services/scroll.service';
import { SeoService } from '../../core/services/seo.service';

const SECTION_IDS = ['home', 'services', 'pricing', 'aboutus', 'blog', 'contact'] as const;

@Component({
  selector: 'app-home-page',
  imports: [Hero, Services, Pricing, AboutUs, BlogTeaser, ContactForm],
  templateUrl: './home-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage implements AfterViewInit {
  #scroll = inject(ScrollService);
  #seo = inject(SeoService);

  constructor() {
    this.#seo.setPage({
      title: $localize`:@@seo.home.title:Angular Atelier – Angular-Entwicklung aus Bern`,
      description: $localize`:@@seo.home.description:Angular Atelier begleitet Teams und Unternehmen beim Aufbau robuster, wartbarer Angular-Architekturen – Beratung, Entwicklung, Migration und Schulungen aus Bern.`,
      path: '/',
    });
  }

  ngAfterViewInit(): void {
    this.#scroll.observeSections(SECTION_IDS);
  }
}

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SERVICES_DATA } from '../../data/services-data';
import { ServiceCard } from '../../shared/ui/service-card/service-card';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-services-page',
  imports: [ServiceCard, RouterLink],
  templateUrl: './services-page.html',
  styleUrl: './services-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesPage {
  #seo = inject(SeoService);

  readonly services = SERVICES_DATA;

  constructor() {
    this.#seo.setPage({
      title: $localize`:@@seo.services.title:Unser Angebot – Angular Atelier`,
      description: $localize`:@@seo.services.description:Alle Leistungen von Angular Atelier: Projektberatung, Reviews, Entwicklung, Designsysteme, Migrationen, Schulungen und mehr.`,
      path: '/services',
    });
  }
}

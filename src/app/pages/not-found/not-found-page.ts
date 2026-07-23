import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-not-found-page',
  imports: [RouterLink],
  templateUrl: './not-found-page.html',
  styleUrl: './not-found-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundPage {
  #seo = inject(SeoService);

  constructor() {
    this.#seo.setPage({
      title: $localize`:@@seo.notFound.title:Seite nicht gefunden – Angular Atelier`,
      description: $localize`:@@seo.notFound.description:Die aufgerufene Seite konnte nicht gefunden werden.`,
      path: '/not-found',
    });
  }
}

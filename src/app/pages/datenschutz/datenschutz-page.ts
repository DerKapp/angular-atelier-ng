import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/services/seo.service';

// NOTE: The text on this page is an unreviewed draft. It has not been
// checked by a lawyer and must not go live before legal sign-off. Replace
// it with the real Datenschutzerklärung text once supplied.
@Component({
  selector: 'app-datenschutz-page',
  imports: [RouterLink],
  templateUrl: './datenschutz-page.html',
  styleUrl: './datenschutz-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatenschutzPage {
  #seo = inject(SeoService);

  constructor() {
    this.#seo.setPage({
      title: 'Datenschutzerklärung – Angular Atelier',
      description: 'Datenschutzerklärung der Angular Atelier GmbH.',
      path: '/datenschutz',
    });
  }
}

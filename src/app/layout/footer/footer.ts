import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ScrollService } from '../../core/services/scroll.service';
import { NAV_ITEMS } from '../../data/nav-items';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  #router = inject(Router);
  #scroll = inject(ScrollService);

  readonly navItems = NAV_ITEMS;
  readonly year = new Date().getFullYear();

  navigateToSection(fragment: string): void {
    if (this.#router.url === '/' || this.#router.url.startsWith('/#')) {
      this.#scroll.scrollToSection(fragment);
    } else {
      this.#router.navigate(['/'], { fragment });
    }
  }
}

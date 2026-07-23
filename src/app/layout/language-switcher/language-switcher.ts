import {
  ChangeDetectionStrategy,
  Component,
  LOCALE_ID,
  computed,
  inject,
  input,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, startWith } from 'rxjs';

// Each locale (de, en) is a separately compiled, separately prerendered static
// bundle — switching languages is a real browser navigation across bundles,
// not an in-app route change, so the inactive segment renders a plain <a href>
// rather than using routerLink/Router.navigate.
@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.html',
  styleUrl: './language-switcher.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageSwitcher {
  #router = inject(Router);
  #locale = inject(LOCALE_ID);

  /** Full-width variant with spelled-out "Deutsch"/"English" labels, used at the top of the open mobile menu. */
  readonly full = input(false);

  readonly isGerman = !this.#locale.startsWith('en');

  readonly #currentPath = toSignal(
    this.#router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map(() => this.#router.url),
      startWith(this.#router.url),
    ),
    { initialValue: this.#router.url },
  );

  readonly otherLocaleHref = computed(() => {
    const path = this.#currentPath();
    if (this.isGerman) {
      return path === '/' ? '/en/' : `/en${path}`;
    }
    const withoutEnPrefix = path.replace(/^\/en(\/|$)/, '/');
    return withoutEnPrefix.length === 0 ? '/' : withoutEnPrefix;
  });
}

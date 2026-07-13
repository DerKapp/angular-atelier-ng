import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { ScrollService } from '../../core/services/scroll.service';
import { NAV_ITEMS } from '../../data/nav-items';
import { MobileMenu } from '../mobile-menu/mobile-menu';

@Component({
  selector: 'app-header',
  imports: [MobileMenu],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  #router = inject(Router);
  #scroll = inject(ScrollService);

  readonly navItems = NAV_ITEMS;
  readonly activeSection = this.#scroll.activeSection;
  readonly menuOpen = signal(false);
  readonly toggleButton = viewChild<ElementRef<HTMLButtonElement>>('toggleButton');

  navigateToSection(fragment: string): void {
    this.menuOpen.set(false);
    if (this.#router.url === '/' || this.#router.url.startsWith('/#')) {
      this.#scroll.scrollToSection(fragment);
    } else {
      this.#router.navigate(['/'], { fragment });
    }
  }

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
    this.toggleButton()?.nativeElement.focus();
  }
}

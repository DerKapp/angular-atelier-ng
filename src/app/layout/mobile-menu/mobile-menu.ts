import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  effect,
  input,
  output,
  viewChild,
} from '@angular/core';
import { NavItem } from '../../data/nav-items';
import { LanguageSwitcher } from '../language-switcher/language-switcher';

@Component({
  selector: 'app-mobile-menu',
  imports: [LanguageSwitcher],
  templateUrl: './mobile-menu.html',
  styleUrl: './mobile-menu.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileMenu {
  readonly open = input.required<boolean>();
  readonly navItems = input.required<readonly NavItem[]>();
  readonly activeSection = input<string>('');
  readonly navigate = output<string>();
  readonly closeRequested = output<void>();

  readonly panel = viewChild<ElementRef<HTMLElement>>('panel');

  constructor() {
    effect(() => {
      if (this.open()) {
        this.panel()?.nativeElement.querySelector<HTMLElement>('a')?.focus();
      }
    });
  }

  onNavigate(fragment: string): void {
    this.navigate.emit(fragment);
  }

  onKeydownEscape(): void {
    this.closeRequested.emit();
  }

  // Simple focus trap: keep Tab/Shift+Tab cycling within the panel's focusable elements.
  onKeydown(event: KeyboardEvent): void {
    if (event.key !== 'Tab') {
      return;
    }
    const panel = this.panel()?.nativeElement;
    if (!panel) {
      return;
    }
    const focusable = Array.from(
      panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'),
    );
    if (focusable.length === 0) {
      return;
    }
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = panel.ownerDocument.activeElement;

    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  }
}

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ScrollService } from '../../../../core/services/scroll.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hero {
  #scroll = inject(ScrollService);

  scrollToContact(): void {
    this.#scroll.scrollToSection('contact');
  }
}

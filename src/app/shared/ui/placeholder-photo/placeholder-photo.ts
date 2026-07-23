import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

// TODO: temporary stand-in for a missing photo asset — replace usages of
// this component with a plain <img> once the real file has been supplied.
@Component({
  selector: 'app-placeholder-photo',
  templateUrl: './placeholder-photo.html',
  styleUrl: './placeholder-photo.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.placeholder-photo--round]': 'round()',
    '[class.placeholder-photo--compact]': 'compact()',
  },
})
export class PlaceholderPhoto {
  readonly label = input.required<string>();
  /** Circular avatar shape instead of the default rounded box. */
  readonly round = input(false);
  /** Too small to fit visible caption text — keep it screen-reader-only. */
  readonly compact = input(false);

  readonly ariaLabel = computed(
    () =>
      $localize`:@@placeholderPhoto.ariaLabel:Platzhalter – Foto von ${this.label()}:name: folgt`,
  );
}

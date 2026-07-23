import {
  ChangeDetectionStrategy,
  Component,
  LOCALE_ID,
  computed,
  inject,
  input,
} from '@angular/core';
import { BlogPost } from '../../../core/models/blog-post.model';
import { PlaceholderPhoto } from '../placeholder-photo/placeholder-photo';

@Component({
  selector: 'app-blog-card',
  imports: [PlaceholderPhoto],
  templateUrl: './blog-card.html',
  styleUrl: './blog-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.blog-card--archive]': 'variant() === "archive"',
  },
})
export class BlogCard {
  #locale = inject(LOCALE_ID);

  readonly post = input.required<BlogPost>();
  /** 'teaser' (Home) has no avatar and a muted background; 'archive' (/blog) shows both. */
  readonly variant = input<'teaser' | 'archive'>('teaser');

  readonly formattedDate = computed(() =>
    new Date(this.post().pubDate).toLocaleDateString(
      this.#locale.startsWith('de') ? 'de-CH' : 'en-CH',
      {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      },
    ),
  );

  readonly accessibleLabel = computed(
    () =>
      $localize`:@@blogCard.accessibleLabel:${this.post().title}:title: – ganzer Artikel auf Medium lesen`,
  );
}

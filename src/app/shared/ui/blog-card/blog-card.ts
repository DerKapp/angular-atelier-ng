import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
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
  readonly post = input.required<BlogPost>();
  /** 'teaser' (Home) has no avatar and a muted background; 'archive' (/blog) shows both. */
  readonly variant = input<'teaser' | 'archive'>('teaser');

  readonly formattedDate = computed(() =>
    new Date(this.post().pubDate).toLocaleDateString('de-CH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  );

  readonly accessibleLabel = computed(
    () => `${this.post().title} – ganzer Artikel auf Medium lesen`,
  );
}

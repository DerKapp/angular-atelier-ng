import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogCard } from '../../../../shared/ui/blog-card/blog-card';
import { BlogPost } from '../../../../core/models/blog-post.model';
import blogPosts from '../../../../data/blog-posts.generated.json';

@Component({
  selector: 'app-blog-teaser',
  imports: [BlogCard, RouterLink],
  templateUrl: './blog-teaser.html',
  styleUrl: './blog-teaser.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogTeaser {
  readonly posts = (blogPosts as BlogPost[]).slice(0, 3);
}

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogCard } from '../../shared/ui/blog-card/blog-card';
import { BlogPost } from '../../core/models/blog-post.model';
import { SeoService } from '../../core/services/seo.service';
import blogPosts from '../../data/blog-posts.generated.json';

@Component({
  selector: 'app-blog-archive-page',
  imports: [BlogCard, RouterLink],
  templateUrl: './blog-archive-page.html',
  styleUrl: './blog-archive-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogArchivePage {
  #seo = inject(SeoService);

  readonly posts = blogPosts as BlogPost[];

  constructor() {
    this.#seo.setPage({
      title: $localize`:@@seo.blog.title:Alle Blogs – Angular Atelier`,
      description: $localize`:@@seo.blog.description:Alle Artikel von Elisa Schnabel und Rafael Kapp zu Angular und Webentwicklung, gesammelt von Medium.`,
      path: '/blog',
    });
  }
}

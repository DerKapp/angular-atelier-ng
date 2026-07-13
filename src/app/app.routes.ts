import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home-page').then((m) => m.HomePage),
  },
  {
    path: 'services',
    loadComponent: () => import('./pages/services/services-page').then((m) => m.ServicesPage),
  },
  {
    path: 'blog',
    loadComponent: () => import('./pages/blog/blog-archive-page').then((m) => m.BlogArchivePage),
  },
  {
    path: 'datenschutz',
    loadComponent: () =>
      import('./pages/datenschutz/datenschutz-page').then((m) => m.DatenschutzPage),
  },
  {
    // Prerendered to browser/not-found/index.html, then copied to browser/404.html by
    // scripts/postbuild-404.mjs so Apache's ErrorDocument 404 can serve a static file.
    path: 'not-found',
    loadComponent: () => import('./pages/not-found/not-found-page').then((m) => m.NotFoundPage),
  },
  {
    // Client-side fallback for stale in-app links; not prerendered (see app.routes.server.ts).
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found-page').then((m) => m.NotFoundPage),
  },
];

import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'services', renderMode: RenderMode.Prerender },
  { path: 'blog', renderMode: RenderMode.Prerender },
  { path: 'datenschutz', renderMode: RenderMode.Prerender },
  { path: 'not-found', renderMode: RenderMode.Prerender },
  // Wildcard fallback: rendered client-side only, not prerendered — there's no bounded
  // set of paths to generate static files for. The static 404.html Apache serves for
  // unmatched real URLs comes from the 'not-found' prerender above via postbuild-404.mjs.
  { path: '**', renderMode: RenderMode.Client },
];

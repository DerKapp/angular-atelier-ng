export interface NavItem {
  label: string;
  /** Section id to scroll to on the home page. */
  fragment: string;
}

export const NAV_ITEMS: readonly NavItem[] = [
  { label: $localize`:@@nav.home:Home`, fragment: 'home' },
  { label: $localize`:@@nav.services:Angebot`, fragment: 'services' },
  { label: $localize`:@@nav.pricing:Preise`, fragment: 'pricing' },
  { label: $localize`:@@nav.aboutUs:Über Uns`, fragment: 'aboutus' },
  { label: $localize`:@@nav.blog:Blogs`, fragment: 'blog' },
  { label: $localize`:@@nav.contact:Kontakt`, fragment: 'contact' },
];

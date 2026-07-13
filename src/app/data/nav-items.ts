export interface NavItem {
  label: string;
  /** Section id to scroll to on the home page. */
  fragment: string;
}

export const NAV_ITEMS: readonly NavItem[] = [
  { label: 'Home', fragment: 'home' },
  { label: 'Angebot', fragment: 'services' },
  { label: 'Über Uns', fragment: 'aboutus' },
  { label: 'Blogs', fragment: 'blog' },
  { label: 'Kontakt', fragment: 'contact' },
];

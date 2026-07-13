import { ServiceItem } from '../core/models/service-item.model';

// Shown on the Home page teaser; the rest are only on the full /services page.
export const FEATURED_SERVICE_IDS: readonly string[] = ['migration', 'schulungen', 'review'];

export const SERVICES_DATA: readonly ServiceItem[] = [
  {
    id: 'projektberatung',
    title: 'Projektberatung',
    tagline: 'Technische Exzellenz von Anfang an.',
    body: 'Wir beraten Teams bei der Architektur von Angular Anwendungen und bei der Auswahl geeigneter Konzepte, Libraries und Tools. Dabei begleiten wir sowohl bestehende Projekte als auch Neuentwicklungen.',
    illustration: 'images/illustrations/service-consulting.png',
    illustrationAlt: 'Illustration zur Projektberatung',
  },
  {
    id: 'review',
    title: 'Review bestehender Projekte',
    tagline: 'Sorgfältige Analyse, klare Empfehlungen.',
    body: 'Wir prüfen Ihr Angular Projekt sorgfältig auf Architektur, Performance und Best Practices. Wir identifizieren Optimierungspotenziale und geben klare, umsetzbare Empfehlungen.',
    illustration: 'images/illustrations/service-review.png',
    illustrationAlt: 'Illustration zum Review bestehender Projekte',
  },
  {
    id: 'entwicklung',
    title: 'Entwicklung auf Projektbasis',
    tagline: 'Outsourcing für Ihre Angular-Entwicklung.',
    body: 'Wir entwickeln Angular-Projekte, Features oder einzelne Komponenten auf Projektbasis und übergeben produktionsreifen Code inkl. technischem Support.',
    illustration: 'images/illustrations/service-development.png',
    illustrationAlt: 'Illustration zur Entwicklung auf Projektbasis',
  },
  {
    id: 'designsystem',
    title: 'Designsystem Setup & Entwicklung',
    tagline: 'Einheitliches Design, effiziente Entwicklung.',
    body: 'Wir übernehmen das technische Setup und den Aufbau von Designsystemen – entweder komplett als Outsourcing-Projekt oder integriert als Erweiterung Ihres Teams.',
    illustration: 'images/illustrations/service-design-system.png',
    illustrationAlt: 'Illustration zum Designsystem Setup & Entwicklung',
  },
  {
    id: 'technisches-setup',
    title: 'Technisches Projekt-Setup',
    tagline: 'Angular-Setup: Massgeschneidert & startklar.',
    body: 'Wir liefern ein vollständiges technisches, auf Sie zugeschnittenes Grundgerüst für Angular-Projekte.',
    illustration: 'images/illustrations/service-technical-setup.png',
    illustrationAlt: 'Illustration zum technischen Projekt-Setup',
  },
  {
    id: 'migration',
    title: 'Migration & Modernisierung',
    tagline: 'Fit für die Zukunft mit aktuellem Angular.',
    body: 'Wir begleiten oder übernehmen die Migration bestehender Angular-Anwendungen auf aktuelle Versionen inklusive Modernisierung veralteter Konzepte.',
    illustration: 'images/illustrations/service-migration.png',
    illustrationAlt: 'Illustration zur Migration & Modernisierung',
  },
  {
    id: 'mitarbeit-im-team',
    title: 'Mitarbeit in eurem Team',
    tagline: 'Gemeinsam im Team – mit Angular-Power.',
    body: 'Wir arbeiten embedded im Team – remote oder vor Ort, in enger Abstimmung mit Projektleitung und Entwickler:innen. Dabei bringen wir nicht nur Geschwindigkeit, sondern auch Angular-Know-how ins Projekt.',
    illustration: 'images/illustrations/service-team.png',
    illustrationAlt: 'Illustration zur Mitarbeit im Team',
  },
  {
    id: 'schulungen',
    title: 'Schulungen',
    tagline: 'Wissen, das Ihr Team weiterbringt.',
    body: 'Wir bieten praxisnahe Angular-Schulungen – remote oder vor Ort – für Entwicklerteams mit unterschiedlichen Erfahrungsstufen, von Anfänger:innen bis Fortgeschrittenen.',
    illustration: 'images/illustrations/service-training.png',
    illustrationAlt: 'Illustration zu Schulungen',
  },
  {
    id: 'vortraege',
    title: 'Vorträge / Talks',
    tagline: 'Impulse für Entwicklerteams.',
    body: 'Wir bieten gezielte Angular-Inputs für Konferenzen, interne Weiterbildungstage oder Team-Meetings. Sie wählen das Thema – oder wir schlagen passende Talks vor.',
    illustration: 'images/illustrations/service-talks.png',
    illustrationAlt: 'Illustration zu Vorträgen und Talks',
  },
];

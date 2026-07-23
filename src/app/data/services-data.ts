import { ServiceItem } from '../core/models/service-item.model';

// Shown on the Home page teaser; the rest are only on the full /services page.
export const FEATURED_SERVICE_IDS: readonly string[] = ['migration', 'schulungen', 'review'];

export const SERVICES_DATA: readonly ServiceItem[] = [
  {
    id: 'projektberatung',
    title: $localize`:@@services.projektberatung.title:Projektberatung`,
    tagline: $localize`:@@services.projektberatung.tagline:Technische Exzellenz von Anfang an.`,
    body: $localize`:@@services.projektberatung.body:Wir beraten Teams bei der Architektur von Angular Anwendungen und bei der Auswahl geeigneter Konzepte, Libraries und Tools. Dabei begleiten wir sowohl bestehende Projekte als auch Neuentwicklungen.`,
    illustration: 'images/illustrations/service-consulting.png',
    illustrationAlt: $localize`:@@services.projektberatung.illustrationAlt:Illustration zur Projektberatung`,
  },
  {
    id: 'review',
    title: $localize`:@@services.review.title:Review bestehender Projekte`,
    tagline: $localize`:@@services.review.tagline:Sorgfältige Analyse, klare Empfehlungen.`,
    body: $localize`:@@services.review.body:Wir prüfen Ihr Angular Projekt sorgfältig auf Architektur, Performance und Best Practices. Wir identifizieren Optimierungspotenziale und geben klare, umsetzbare Empfehlungen.`,
    illustration: 'images/illustrations/service-review.png',
    illustrationAlt: $localize`:@@services.review.illustrationAlt:Illustration zum Review bestehender Projekte`,
  },
  {
    id: 'entwicklung',
    title: $localize`:@@services.entwicklung.title:Entwicklung auf Projektbasis`,
    tagline: $localize`:@@services.entwicklung.tagline:Outsourcing für Ihre Angular-Entwicklung.`,
    body: $localize`:@@services.entwicklung.body:Wir entwickeln Angular-Projekte, Features oder einzelne Komponenten auf Projektbasis und übergeben produktionsreifen Code inkl. technischem Support.`,
    illustration: 'images/illustrations/service-development.png',
    illustrationAlt: $localize`:@@services.entwicklung.illustrationAlt:Illustration zur Entwicklung auf Projektbasis`,
  },
  {
    id: 'designsystem',
    title: $localize`:@@services.designsystem.title:Designsystem Setup & Entwicklung`,
    tagline: $localize`:@@services.designsystem.tagline:Einheitliches Design, effiziente Entwicklung.`,
    body: $localize`:@@services.designsystem.body:Wir übernehmen das technische Setup und den Aufbau von Designsystemen – entweder komplett als Outsourcing-Projekt oder integriert als Erweiterung Ihres Teams.`,
    illustration: 'images/illustrations/service-design-system.png',
    illustrationAlt: $localize`:@@services.designsystem.illustrationAlt:Illustration zum Designsystem Setup & Entwicklung`,
  },
  {
    id: 'technisches-setup',
    title: $localize`:@@services.technischesSetup.title:Technisches Projekt-Setup`,
    tagline: $localize`:@@services.technischesSetup.tagline:Angular-Setup: Massgeschneidert & startklar.`,
    body: $localize`:@@services.technischesSetup.body:Wir liefern ein vollständiges technisches, auf Sie zugeschnittenes Grundgerüst für Angular-Projekte.`,
    illustration: 'images/illustrations/service-technical-setup.png',
    illustrationAlt: $localize`:@@services.technischesSetup.illustrationAlt:Illustration zum technischen Projekt-Setup`,
  },
  {
    id: 'migration',
    title: $localize`:@@services.migration.title:Migration & Modernisierung`,
    tagline: $localize`:@@services.migration.tagline:Fit für die Zukunft mit aktuellem Angular.`,
    body: $localize`:@@services.migration.body:Wir begleiten oder übernehmen die Migration bestehender Angular-Anwendungen auf aktuelle Versionen inklusive Modernisierung veralteter Konzepte.`,
    illustration: 'images/illustrations/service-migration.png',
    illustrationAlt: $localize`:@@services.migration.illustrationAlt:Illustration zur Migration & Modernisierung`,
  },
  {
    id: 'mitarbeit-im-team',
    title: $localize`:@@services.team.title:Mitarbeit in eurem Team`,
    tagline: $localize`:@@services.team.tagline:Gemeinsam im Team – mit Angular-Power.`,
    body: $localize`:@@services.team.body:Wir arbeiten embedded im Team – remote oder vor Ort, in enger Abstimmung mit Projektleitung und Entwickler:innen. Dabei bringen wir nicht nur Geschwindigkeit, sondern auch Angular-Know-how ins Projekt.`,
    illustration: 'images/illustrations/service-team.png',
    illustrationAlt: $localize`:@@services.team.illustrationAlt:Illustration zur Mitarbeit im Team`,
  },
  {
    id: 'schulungen',
    title: $localize`:@@services.schulungen.title:Schulungen`,
    tagline: $localize`:@@services.schulungen.tagline:Wissen, das Ihr Team weiterbringt.`,
    body: $localize`:@@services.schulungen.body:Wir bieten praxisnahe Angular-Schulungen – remote oder vor Ort – für Entwicklerteams mit unterschiedlichen Erfahrungsstufen, von Anfänger:innen bis Fortgeschrittenen.`,
    illustration: 'images/illustrations/service-training.png',
    illustrationAlt: $localize`:@@services.schulungen.illustrationAlt:Illustration zu Schulungen`,
  },
  {
    id: 'vortraege',
    title: $localize`:@@services.vortraege.title:Vorträge / Talks`,
    tagline: $localize`:@@services.vortraege.tagline:Impulse für Entwicklerteams.`,
    body: $localize`:@@services.vortraege.body:Wir bieten gezielte Angular-Inputs für Konferenzen, interne Weiterbildungstage oder Team-Meetings. Sie wählen das Thema – oder wir schlagen passende Talks vor.`,
    illustration: 'images/illustrations/service-talks.png',
    illustrationAlt: $localize`:@@services.vortraege.illustrationAlt:Illustration zu Vorträgen und Talks`,
  },
];

import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { routes } from './app.routes';
import { FORMSPREE_ENDPOINT } from './core/config/app.constants';
import { ContactSubmissionService } from './core/services/contact-submission.service';
import {
  CONTACT_SUBMISSION_CONFIG,
  FormspreeContactSubmissionService,
} from './core/services/formspree-contact-submission.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(
      routes,
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' }),
    ),
    provideClientHydration(withEventReplay()),
    { provide: CONTACT_SUBMISSION_CONFIG, useValue: { endpoint: FORMSPREE_ENDPOINT } },
    { provide: ContactSubmissionService, useClass: FormspreeContactSubmissionService },
  ],
};

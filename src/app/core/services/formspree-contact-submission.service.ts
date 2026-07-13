import { Injectable, InjectionToken, inject } from '@angular/core';
import { ContactFormPayload, ContactSubmissionService } from './contact-submission.service';

export interface ContactSubmissionConfig {
  endpoint: string;
}

export const CONTACT_SUBMISSION_CONFIG = new InjectionToken<ContactSubmissionConfig>(
  'CONTACT_SUBMISSION_CONFIG',
);

@Injectable()
export class FormspreeContactSubmissionService extends ContactSubmissionService {
  #config = inject(CONTACT_SUBMISSION_CONFIG);

  override async submit(payload: ContactFormPayload): Promise<void> {
    const response = await fetch(this.#config.endpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Formspree submission failed with status ${response.status}`);
    }
  }
}

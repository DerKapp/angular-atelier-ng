import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import {
  ContactFormPayload,
  ContactSubmissionService,
} from '../../../../core/services/contact-submission.service';

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactForm {
  #submissionService = inject(ContactSubmissionService);

  readonly name = signal('');
  readonly email = signal('');
  readonly company = signal('');
  readonly message = signal('');
  readonly status = signal<SubmitStatus>('idle');
  readonly touched = signal<Record<string, boolean>>({});

  readonly nameError = computed(() =>
    this.touched()['name'] && this.name().trim().length === 0
      ? 'Bitte geben Sie Ihren Namen an.'
      : null,
  );

  readonly emailError = computed(() => {
    if (!this.touched()['email']) {
      return null;
    }
    const value = this.email().trim();
    if (value.length === 0) {
      return 'Bitte geben Sie Ihre E-Mail-Adresse an.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return 'Bitte geben Sie eine gültige E-Mail-Adresse an.';
    }
    return null;
  });

  readonly messageError = computed(() =>
    this.touched()['message'] && this.message().trim().length === 0
      ? 'Bitte geben Sie eine Nachricht ein.'
      : null,
  );

  readonly isValid = computed(
    () =>
      this.name().trim().length > 0 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email().trim()) &&
      this.message().trim().length > 0,
  );

  markTouched(field: string): void {
    this.touched.update((current) => ({ ...current, [field]: true }));
  }

  async submit(): Promise<void> {
    this.touched.set({ name: true, email: true, message: true });
    if (!this.isValid()) {
      return;
    }

    this.status.set('submitting');

    const payload: ContactFormPayload = {
      name: this.name().trim(),
      email: this.email().trim(),
      company: this.company().trim() || undefined,
      message: this.message().trim(),
    };

    try {
      await this.#submissionService.submit(payload);
      this.status.set('success');
      this.name.set('');
      this.email.set('');
      this.company.set('');
      this.message.set('');
      this.touched.set({});
    } catch {
      this.status.set('error');
    }
  }
}

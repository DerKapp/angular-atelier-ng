export interface ContactFormPayload {
  name: string;
  email: string;
  company?: string;
  message: string;
}

export abstract class ContactSubmissionService {
  abstract submit(payload: ContactFormPayload): Promise<void>;
}

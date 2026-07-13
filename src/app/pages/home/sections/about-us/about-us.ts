import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CONTACT_EMAIL } from '../../../../core/config/app.constants';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.html',
  styleUrl: './about-us.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutUs {
  readonly contactEmail = CONTACT_EMAIL;
}

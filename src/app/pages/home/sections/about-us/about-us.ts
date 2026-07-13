import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PlaceholderPhoto } from '../../../../shared/ui/placeholder-photo/placeholder-photo';
import { CONTACT_EMAIL } from '../../../../core/config/app.constants';

@Component({
  selector: 'app-about-us',
  imports: [PlaceholderPhoto],
  templateUrl: './about-us.html',
  styleUrl: './about-us.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutUs {
  readonly contactEmail = CONTACT_EMAIL;
}

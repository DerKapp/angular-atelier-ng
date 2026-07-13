import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FEATURED_SERVICE_IDS, SERVICES_DATA } from '../../../../data/services-data';
import { ServiceCard } from '../../../../shared/ui/service-card/service-card';

@Component({
  selector: 'app-services',
  imports: [ServiceCard, RouterLink],
  templateUrl: './services.html',
  styleUrl: './services.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Services {
  readonly services = FEATURED_SERVICE_IDS.map((id) =>
    SERVICES_DATA.find((service) => service.id === id),
  ).filter((service) => service !== undefined);
}

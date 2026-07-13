import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ServiceItem } from '../../../core/models/service-item.model';

@Component({
  selector: 'app-service-card',
  templateUrl: './service-card.html',
  styleUrl: './service-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceCard {
  readonly service = input.required<ServiceItem>();
}

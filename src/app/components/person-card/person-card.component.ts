import {
  DatePipe,
  NgIf
} from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Person } from '../../shared/interfaces/person';
import { ImagePathPipe } from '../../shared/pipes/image-path.pipe';

@Component({
  selector: 'tmbd-person-card',
  standalone: true,
  templateUrl: './person-card.component.html',
  imports: [
    NgIf,
    ImagePathPipe,
    RouterLink,
    DatePipe
  ],
  styleUrls: ['./person-card.component.scss']
})
export class PersonCardComponent {
  @Input() public person?: Person;
}

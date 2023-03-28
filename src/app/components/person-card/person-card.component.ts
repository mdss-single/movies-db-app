import {
  DatePipe,
  NgIf
} from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ImagePathPipe } from '../../shared/pipes/image-path.pipe';

type PersonCard = {
  id: number;
  type: string;
  name: string;
  poster: string;
  role?: string;
}

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
  @Input() public person?: PersonCard;
}

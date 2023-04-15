import {
  Component,
  Input
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CastCard } from '../../shared/interfaces/cast';

@Component({
  selector: 'tmbd-person-cast',
  standalone: true,
    imports: [CommonModule, RouterLink],
  templateUrl: './person-cast.component.html',
  styleUrls: ['./person-cast.component.scss']
})
export class PersonCastComponent {
  @Input() public castList?: CastCard[];
}

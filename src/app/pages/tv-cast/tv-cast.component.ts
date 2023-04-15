import { Component } from '@angular/core';
import { CastDetailsComponent } from '../../components/cast-details/cast-details.component';
import { MediaType } from '../../shared/enums/media-types';

@Component({
  selector: 'tmbd-tv-cast',
  standalone: true,
  templateUrl: './tv-cast.component.html',
  imports: [
    CastDetailsComponent
  ],
  styleUrls: ['./tv-cast.component.scss']
})
export class TvCastComponent {
  public pageType = MediaType;
}

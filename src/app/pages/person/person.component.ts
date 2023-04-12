import {
  AsyncPipe,
  DatePipe,
  NgForOf,
  NgIf,
  NgTemplateOutlet
} from '@angular/common';
import { Component } from '@angular/core';
import {
  ActivatedRoute,
  RouterLink
} from '@angular/router';
import {
  combineLatest,
  filter,
  map,
  Observable,
  of,
  switchMap
} from 'rxjs';
import { PersonCardComponent } from '../../components/person-card/person-card.component';
import { PersonCastComponent } from '../../components/person-cast/person-cast.component';
import { ScrollerComponent } from '../../components/scroller/scroller.component';
import { ThumbnailCardSelectorComponent } from '../../components/thumbnail-card-selector/thumbnail-card-selector.component';
import { ApiRequestType } from '../../shared/enums/api-request';
import { CastAndCrew } from '../../shared/interfaces/cast';
import { PersonDetails } from '../../shared/interfaces/person';
import { SearchCard } from '../../shared/interfaces/search';
import { FilterPipe } from '../../shared/pipes/filter.pipe';
import { ImagePathPipe } from '../../shared/pipes/image-path.pipe';
import { ApiService } from '../../shared/services/api.service';

type DetailsWithKnownFor = {
  person: PersonDetails;
  cast: SearchCard[];
}

@Component({
  selector: 'tmbd-person',
  standalone: true,
    imports: [
        ImagePathPipe,
        ScrollerComponent,
        PersonCardComponent,
        ThumbnailCardSelectorComponent,
        DatePipe,
        AsyncPipe,
        NgIf,
        NgForOf,
        FilterPipe,
        RouterLink,
        NgTemplateOutlet,
        PersonCastComponent
    ],
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent {
  private personId$: Observable<string> = this.route.params.pipe(
    map(value => value['id']),
    filter(Boolean),
  );

  public person$: Observable<DetailsWithKnownFor> = this.personId$.pipe(
    switchMap((personId) => {
      const personRequest = ApiRequestType.Person + personId;
      return this.apiService.getPersonDetails$(personRequest);
    }),
    switchMap((person) => {
      const castRequest = ApiRequestType.SearchPerson + person.name;
      const cast$ = this.apiService.getPersonKnowsFor$(castRequest, person.id);
      return combineLatest([of(person), cast$]);
    }),
    map(([person, cast]) => ({
      person,
      cast,
    })),
  );

  public personCast$: Observable<CastAndCrew> = this.personId$.pipe(
    switchMap((personId) => {
      const request= ApiRequestType.Person + personId + ApiRequestType.PersonCast;
      return this.apiService.getPersonCast$(request);
    }),
  );

  constructor(
    private readonly apiService: ApiService,
    private readonly route: ActivatedRoute,
  ) {}
}

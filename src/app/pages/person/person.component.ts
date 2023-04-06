import {
  AsyncPipe,
  DatePipe,
  NgForOf,
  NgIf
} from '@angular/common';
import { Component } from '@angular/core';
import {
  ActivatedRoute,
  RouterLink
} from '@angular/router';
import {
  filter,
  map,
  Observable,
  switchMap
} from 'rxjs';
import { PersonCardComponent } from '../../components/person-card/person-card.component';
import { ScrollerComponent } from '../../components/scroller/scroller.component';
import { ThumbnailCardSelectorComponent } from '../../components/thumbnail-card-selector/thumbnail-card-selector.component';
import { ApiRequestType } from '../../shared/enums/api-request';
import { CastCard } from '../../shared/interfaces/cast';
import { PersonDetails } from '../../shared/interfaces/person';
import { SearchCard } from '../../shared/interfaces/search';
import { FilterPipe } from '../../shared/pipes/filter.pipe';
import { ImagePathPipe } from '../../shared/pipes/image-path.pipe';
import { ApiService } from '../../shared/services/api.service';

type PersonCast = {
  cast: CastCard[];
  crew: CastCard[];
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
    RouterLink
  ],
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent {
  public readonly filterByCast = (value: PersonCast) => value.cast !== undefined;
  public readonly filterByCrew = (value: PersonCast) => value.crew !== undefined;

  private personId$: Observable<string> = this.route.params.pipe(
    map(value => value['id']),
    filter(Boolean),
  );

  public personDetails$: Observable<PersonDetails> = this.personId$.pipe(
    switchMap((personId) => {
      const request = ApiRequestType.Person + personId;
      return this.apiService.getPersonDetails$(request);
    }),
  );

  public personKnownFor$: Observable<SearchCard[]> = this.personDetails$.pipe(
    map((person) => ({
      id: person.id,
      name: person.name,
    })),
    switchMap(({ id, name }) => {
      const request = ApiRequestType.SearchPerson + name;
      return this.apiService.getPersonKnowsFor$(request, id);
    })
  );

  public personCast$: Observable<PersonCast> = this.personId$.pipe(
    switchMap((personId) => {
      const request= ApiRequestType.Person + personId + ApiRequestType.PersonCast;
      return this.apiService.getPersonCast$(request);
    })
  );

  constructor(
    private readonly apiService: ApiService,
    private readonly route: ActivatedRoute,
  ) {}
}

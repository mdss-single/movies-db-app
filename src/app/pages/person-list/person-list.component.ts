import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { PersonCardComponent } from '../../components/person-card/person-card.component';
import { ApiRequestType } from '../../shared/enums/api-request';
import { personFromListMapper } from '../../shared/helpers/person.mapper';
import {
  PersonInfoResult,
  PersonListDTO
} from '../../shared/interfaces/person';
import { ApiService } from '../../shared/services/api.service';

type PageNumber = number;

@Component({
  selector: 'tmbd-person-list',
  standalone: true,
  imports: [CommonModule, PersonCardComponent, PaginationComponent],
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss']
})
export class PersonListComponent {
  public peopleData$: Observable<PersonListDTO> = this.loadPeopleData$(1);

  constructor(private apiService: ApiService) {}

  public mapPersonData(person: PersonInfoResult): PersonInfoResult {
    return personFromListMapper(person);
  }

  public loadNewPage(page: any): void {
    this.peopleData$ = this.loadPeopleData$(page);
  }

  private loadPeopleData$(pageNumber: PageNumber): Observable<PersonListDTO> {
    return this.apiService.getPeopleList$(ApiRequestType.PersonList + pageNumber);
  }
}

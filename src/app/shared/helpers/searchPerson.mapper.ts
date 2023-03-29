import { SearchMediaType } from '../enums/search';
import {
  SearchCard,
  SearchCardDTO
} from '../interfaces/search';

export function searchPersonMapper(obj: SearchCardDTO): SearchCard {
  return {
    id: obj.id ?? 0,
    title: obj.name ?? '',
    poster: obj.profile_path ?? '',
    type: SearchMediaType.Person,
  }
}

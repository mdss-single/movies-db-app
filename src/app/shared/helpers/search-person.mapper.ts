import { MediaType } from '../enums/media-types';
import {
  SearchCard,
  SearchCardDTO
} from '../interfaces/search';

export function searchPersonMapper(obj: SearchCardDTO): SearchCard {
  return {
    id: obj.id ?? 0,
    title: obj.name ?? '',
    poster: obj.profile_path ?? '',
    type: MediaType.Person,
  }
}

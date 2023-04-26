import { Genders } from '../enums/genders';
import {
  PersonDetails,
  PersonDTO,
  PersonInfoResult
} from '../interfaces/person';

export function personMapper(obj: PersonDTO): PersonDetails {
  return {
    id: obj.id ?? 0,
    name: obj.name ?? '',
    biography: obj.biography ?? '',
    birthday: obj.birthday ? new Date(obj.birthday) : new Date(),
    gender: obj.gender === 2 ? Genders.Male : Genders.Female,
    place_of_birth: obj.place_of_birth ?? '',
    photo: obj.profile_path ?? '',
  }
}

export function personFromListMapper(obj: PersonDTO): PersonInfoResult {
  return {
    id: obj.id ?? 0,
    name: obj.name ?? '',
    profile_path: obj.profile_path ?? '',
  }
}

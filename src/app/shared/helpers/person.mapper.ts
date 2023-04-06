import {
  PersonDetails,
  PersonDTO
} from '../interfaces/person';

export function personMapper(obj: PersonDTO): PersonDetails {
  return {
    id: obj.id ?? 0,
    name: obj.name ?? '',
    biography: obj.biography ?? '',
    birthday: obj.birthday ?? new Date(),
    gender: obj.gender === 2 ? 'Male' : 'Female',
    place_of_birth: obj.place_of_birth ?? '',
    photo: obj.profile_path ?? '',
  }
}

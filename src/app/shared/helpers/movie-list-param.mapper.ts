import { MediaType } from '../enums/media-types';
import { SearchParams } from '../interfaces/search';

type EntryType = string;
type EntryGenres = number[];
type EntryValue = string | Date | EntryGenres;
type Entry = [EntryType, (EntryValue)];

type ParamsObject = {
  'sort_by': string;
  'with_genres': EntryGenres,
}

type MovieParamsObject = {
  'release_date.gte': string,
  'release_date.lte': string,
} & ParamsObject;

type TvParamsObject = {
  'first_air_date.gte': string,
  'first_air_date.lte': string,
} & ParamsObject;

export function movieTvListParamMapper(obj: SearchParams, mediaType: MediaType.Movie | MediaType.Tv): string {
  const paramsObject = getParamsObject(obj, mediaType);
  const searchParams = new URLSearchParams();

  Object.entries(paramsObject).forEach((entry: Entry) => {
    const [type, value] = entry;

    if (value === '') {
      return;
    }

    if (type === 'with_genres') {
      const genres = value as EntryGenres;

      if (!genres.length) {
        return;
      }

      searchParams.append(type, encodeURIComponent(genres.join(',')));

      return;
    }

    searchParams.append(type, value.toString());
  });

  return searchParams.toString();
}

function getParamsObject(obj: SearchParams, mediaType: MediaType.Movie | MediaType.Tv): MovieParamsObject | TvParamsObject {
  if (mediaType === MediaType.Movie) {
    return {
      'sort_by': obj.sort,
      'release_date.gte': obj.dateFrom,
      'release_date.lte': obj.dateTo,
      'with_genres': obj.genres,
    }
  }

  return {
    'sort_by': obj.sort,
    'first_air_date.gte': obj.dateFrom,
    'first_air_date.lte': obj.dateTo,
    'with_genres': obj.genres,
  }
}

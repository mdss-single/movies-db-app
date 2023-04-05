import { Department } from '../enums/departments';

export interface CastDTO {
  adult?:                boolean;
  gender?:               number;
  id?:                   number;
  known_for_department?: Department;
  name?:                 string;
  original_name?:        string;
  popularity?:           number;
  profile_path?:         null | string;
  cast_id?:              number;
  character?:            string;
  credit_id:             string;
  order?:                number;
  department?:           Department;
  job?:                  string;
}

export interface CastCard {
  id: number;
  name: string;
  poster: string;
  role: string;
}

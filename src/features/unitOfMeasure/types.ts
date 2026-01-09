import { UnitOfMeasureType } from "../common/unitOfMeasureTypeEnum";

export interface UnitOfMeasure {
  _id: string;
  name: string;
  abbreviation: string;
  type: UnitOfMeasureType;
}

export interface UnitOfMeasureState {
  data: UnitOfMeasure[] | null;
  loading: boolean;
  error: string | null;
}

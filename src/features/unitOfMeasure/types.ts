import { UnitOfMeasureType } from "../common/unitOfMeasureTypeEnum";

export interface unitOfMeasure {
  _id: string;
  name: string;
  abbreviation: string;
  type: UnitOfMeasureType;
}

export interface unitOfMeasureState {
  data: unitOfMeasure[] | null;
  loading: boolean;
  error: string | null;
}

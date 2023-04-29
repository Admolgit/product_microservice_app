import { FindOperator } from "typeorm";

export type FindConditions<T> = {
  [P in keyof T]?: FindConditions<T[P]>|FindOperator<FindConditions<T[P]>>;
};
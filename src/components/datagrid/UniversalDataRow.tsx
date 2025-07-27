import { type ArrayExampleDataRow } from "../tabs/array/arrayOptionsConstants";
import { type StringExampleDataRow } from "../tabs/string/stringOptionsConstants";
import { type NumberExampleDataRow } from "../tabs/number/numberOptionsConstants";

export type UniversalDataRow = ArrayExampleDataRow | StringExampleDataRow | NumberExampleDataRow;
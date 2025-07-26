import { type ArrayExampleDataRow } from "../tabs/array/ArrayOptionsConstants";
import { type StringExampleDataRow } from "../tabs/string/StringOptionsConstants";
import { type NumberExampleDataRow } from "../tabs/number/NumberOptionsConstants";

export type UniversalDataRow = ArrayExampleDataRow | StringExampleDataRow | NumberExampleDataRow;
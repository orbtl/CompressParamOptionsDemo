import type { SelectedOptions } from "compress-param-options";
import type { FilterableData } from "./filterable";

type EnabledFilters = Record<string, Set<string>>;

export function filterData(
  allData: FilterableData[],
  selectedOptions: SelectedOptions
): FilterableData[] {
  // In a real world environment there would be more hardcoded data fields
  // that would not be dynamic at runtime.  Since this is fake example data,
  // they are split by a dash to make things simple, which we will use here
  // to dynamically figure out which fields we are filtering on.

  // Start by making a mapping of each field to the values we are including.  
  // If a field is missing, we won't filter on it at all
  const enabledFilters = mapEnabledFilters(selectedOptions);

  const filteredData: FilterableData[] = [];

  for (const data of allData) {
    let dataPassesFilters = true;
    for (const filterKey of Object.keys(enabledFilters)) {
      const value = data[filterKey];
      if (!passesFilter(value, enabledFilters[filterKey])) {
        // If even a single filter doesn't match, this data shouldn't be included
        // We can break and skip checking the rest
        dataPassesFilters = false;
        break;
      }
    }

    if (dataPassesFilters) {
      filteredData.push(data);
    }
  }

  return filteredData;
}

function mapEnabledFilters(selectedOptions: SelectedOptions): EnabledFilters {
  return [...selectedOptions].reduce<Record<string, Set<string>>>(
    (mapping, option) => {
      const [field, value] = option.split('-');
      if (!field || !value) {
        return mapping;
      }
      if (!(field in mapping)) {
        mapping[field] = new Set<string>();
      }
      mapping[field].add(value);

      return mapping;
    },
    {});
}

function passesFilter(
  value: string | number | string[],
  enabledFilterValues: Set<string>
): boolean {
  if (Array.isArray(value)) {
    return value.some(x => enabledFilterValues.has(x));
  } else if (typeof value === 'string') {
    return enabledFilterValues.has(value);
  } else {
    // No number filtering actually in use
    return false;
  }
}
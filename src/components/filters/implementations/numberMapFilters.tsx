import React from 'react';
import { type NumberOptionMap, type SelectedOptions } from 'compress-param-options';
import FilterCategory from '../components/filterCategory';
import FilterSection from '../components/filterSection';

interface NumberMapFiltersProps {
  optionMap: NumberOptionMap;
  selectedOptions: SelectedOptions;
  onOptionChange: (option: string, checked: boolean) => void;
}

const formatGroupTitle = (prefix: string) => {
  return `${prefix.charAt(0).toUpperCase() + prefix.slice(1)} Options`;
};

const NumberMapFilters: React.FC<NumberMapFiltersProps> = ({
  optionMap,
  selectedOptions,
  onOptionChange,
}) => {
  // Group options by prefix
  const groupedOptions = React.useMemo(() => {
    const groups: Record<string, Array<{ key: string; value: string; label: string }>> = {};

    Object.entries(optionMap).forEach(([key, value]) => {
      const split = value.split('-');
      const prefix = split[0];
      if (!groups[prefix]) {
        groups[prefix] = [];
      }
      groups[prefix].push({ key, value, label: split[1] });
    });

    return groups;
  }, [optionMap]);

  return (
    <FilterSection>
      {Object.entries(groupedOptions).map(([prefix, options]) => (
        <FilterCategory
          key={prefix}
          title={formatGroupTitle(prefix)}
          options={options}
          selectedOptions={selectedOptions}
          onOptionChange={onOptionChange}
        />
      ))}
    </FilterSection>
  );
};

export default NumberMapFilters;
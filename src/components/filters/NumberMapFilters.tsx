import React from 'react';
import {
  Typography,
  FormGroup,
  Card,
  CardContent,
} from '@mui/material';
import { type NumberOptionMap, type SelectedOptions } from 'compress-param-options';
import FilterSection from './FilterSection';

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
      const prefix = value.split('-')[0];
      if (!groups[prefix]) {
        groups[prefix] = [];
      }
      groups[prefix].push({ key, value, label: `${key} → ${value}` });
    });

    return groups;
  }, [optionMap]);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Filter Options
        </Typography>
        <FormGroup>
          {Object.entries(groupedOptions).map(([prefix, options]) => (
            <FilterSection
              key={prefix}
              title={formatGroupTitle(prefix)}
              options={options}
              selectedOptions={selectedOptions}
              onOptionChange={onOptionChange}
            />
          ))}
        </FormGroup>
      </CardContent>
    </Card>
  );
};

export default NumberMapFilters;
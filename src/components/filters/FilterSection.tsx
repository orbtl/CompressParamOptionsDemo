import React from 'react';
import {
  Typography,
  FormControlLabel,
} from '@mui/material';
import { type SelectedOptions } from 'compress-param-options';
import FilterCheckbox from './FilterCheckbox';

interface FilterSectionProps {
  title: string;
  options: Array<{ key: string; value: string; label: string }>;
  selectedOptions: SelectedOptions;
  onOptionChange: (option: string, checked: boolean) => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  title,
  options,
  selectedOptions,
  onOptionChange,
}) => {
  return (
    <>
      <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
        {title}
      </Typography>
      {options.map(({ key, value, label }) => (
        <FormControlLabel
          key={key}
          control={
            <FilterCheckbox
              checked={selectedOptions.has(value)}
              onOptionChange={onOptionChange}
              value={value}
            />
          }
          label={label}
        />
      ))}
    </>
  );
};

export default FilterSection;
import React from 'react';
import {
  Typography,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { type SelectedOptions } from 'compress-param-options';

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
            <Checkbox
              checked={selectedOptions.has(value)}
              onChange={(e) => onOptionChange(value, e.target.checked)}
            />
          }
          label={label}
        />
      ))}
    </>
  );
};

export default FilterSection;
import React from 'react';
import {
  Grid,
  Typography,
  FormControlLabel,
} from '@mui/material';
import { type SelectedOptions } from 'compress-param-options';
import FilterCheckbox from './FilterCheckbox';

interface FilterCategoryProps {
  title: string;
  options: Array<{ key: string; value: string; label: string }>;
  selectedOptions: SelectedOptions;
  onOptionChange: (option: string, checked: boolean) => void;
}

const FilterCategory: React.FC<FilterCategoryProps> = ({
  title,
  options,
  selectedOptions,
  onOptionChange,
}) => {
  return (
    <Grid size={{ xs: 12, md: 2 }}>
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
    </Grid>
  );
};

export default FilterCategory;
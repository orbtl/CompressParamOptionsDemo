import React, { useCallback } from 'react';
import { Checkbox } from '@mui/material';

interface FilterCheckboxProps {
  value: string;
  checked: boolean;
  onOptionChange: (option: string, checked: boolean) => void;
}

const FilterCheckbox: React.FC<FilterCheckboxProps> = ({
  value,
  checked,
  onOptionChange,
}) => {
  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onOptionChange(value, e.target.checked);
  }, [value, onOptionChange]);

  return (
    <Checkbox
      checked={checked}
      onChange={onChange}
    />
  );
}

export default FilterCheckbox;
import React, { useMemo } from 'react';
import {
  Container,
  Typography,
} from '@mui/material';

import { StringMapFilters } from '../../filters';
import CompressionResults from '../../common/CompressionResults';
import FilteredDataGrid from '../../datagrid/FilteredDataGrid';
import { useUrlSelectedOptions } from '../../../hooks/useUrlSelectedOptions';
import { fakeData, stringOptionMap, columns } from './StringOptionsConstants';
import ParamName from '../../common/ParamName';

const StringOptionsDemo: React.FC = () => {
  const { selectedOptions, handleOptionChange, compressedString } = useUrlSelectedOptions(stringOptionMap, ParamName);

  const filteredData = useMemo(() => {
    if (selectedOptions.size === 0) return fakeData;

    return fakeData.filter(row => {
      return selectedOptions.has(row.size) ||
        selectedOptions.has(row.temperature) ||
        selectedOptions.has(row.color) ||
        selectedOptions.has(row.speed) ||
        selectedOptions.has(row.mode);
    });
  }, [selectedOptions]);

  return (
    <Container maxWidth="xl">
      <Typography variant="h5" gutterBottom>
        String Keys Demo
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        This demo uses a StringOptionMap where keys are short codes and values are descriptive option names.
        Select filters to see compression in action and how it affects the data display.
      </Typography>

      <StringMapFilters
        optionMap={stringOptionMap}
        selectedOptions={selectedOptions}
        onOptionChange={handleOptionChange}
      />

      <CompressionResults
        compressedOptions={compressedString}
        decompressedOptions={selectedOptions}
      />

      <FilteredDataGrid
        data={filteredData}
        columns={columns}
        title="Filtered Data"
      />
    </Container>
  );
};

export default StringOptionsDemo;
import React, { useMemo } from 'react';
import {
  Container,
  Typography,
  Stack
} from '@mui/material';

import { StringMapFilters } from '../../filters';
import CompressionResults from '../../common/CompressionResults';
import FilteredDataGrid from '../../datagrid/FilteredDataGrid';
import { useUrlSelectedOptions } from '../../../hooks/useUrlSelectedOptions';
import { fakeData, stringOptionMap, columns } from './StringOptionsConstants';

const StringOptionsDemo: React.FC = () => {
  const { selectedOptions, handleOptionChange, compressedString } = useUrlSelectedOptions(stringOptionMap, 'f');

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

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} sx={{ mt: 3 }}>
        <StringMapFilters
          optionMap={stringOptionMap}
          selectedOptions={selectedOptions}
          onOptionChange={handleOptionChange}
        />

        <CompressionResults
          selectedOptions={selectedOptions}
          compressedOptions={compressedString}
          decompressedOptions={selectedOptions}
        />
      </Stack>

      <FilteredDataGrid
        data={filteredData}
        columns={columns}
        title="Filtered Data"
      />
    </Container>
  );
};

export default StringOptionsDemo;
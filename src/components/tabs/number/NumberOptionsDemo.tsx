import React, { useMemo } from 'react';
import {
  Grid,
  Typography,
} from '@mui/material';

import { NumberMapFilters } from '../../filters';
import CompressionResults from '../../common/CompressionResults';
import FilteredDataGrid from '../../datagrid/FilteredDataGrid';
import { useUrlSelectedOptions } from '../../../hooks/useUrlSelectedOptions';
import { fakeData, numberOptionMap, columns } from './NumberOptionsConstants';

const NumberOptionsDemo: React.FC = () => {
  const { selectedOptions, handleOptionChange, compressedString } = useUrlSelectedOptions(numberOptionMap, 'f');

  const filteredData = useMemo(() => {
    if (selectedOptions.size === 0) return fakeData;

    return fakeData.filter(row => {
      return selectedOptions.has(row.priority) ||
        selectedOptions.has(row.status) ||
        selectedOptions.has(row.type) ||
        selectedOptions.has(row.region) ||
        selectedOptions.has(row.department);
    });
  }, [selectedOptions]);

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12 }}>
        <Typography variant="h5" gutterBottom>
          Number Keys Demo
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          This demo uses a NumberOptionMap where numeric keys map to descriptive option values.
          Number keys provide consistent mapping regardless of insertion order.
        </Typography>
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <NumberMapFilters
          optionMap={numberOptionMap}
          selectedOptions={selectedOptions}
          onOptionChange={handleOptionChange}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 8 }}>
        <CompressionResults
          selectedOptions={selectedOptions}
          compressedOptions={compressedString}
          decompressedOptions={selectedOptions}
          formatOptionLabel={(option) => {
            // Find the key for this value in the numberOptionMap
            const key = Object.keys(numberOptionMap).find(k => numberOptionMap[Number(k)] === option);
            return key ? `${key} → ${option}` : option;
          }}
        />
      </Grid>

      <Grid size={{ xs: 12 }}>
        <FilteredDataGrid
          data={filteredData}
          columns={columns}
          title="Filtered Data"
        />
      </Grid>
    </Grid>
  );
};

export default NumberOptionsDemo;
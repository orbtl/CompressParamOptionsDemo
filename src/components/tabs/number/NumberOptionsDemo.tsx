import React, { useMemo } from 'react';
import {
  Container,
  Typography,
} from '@mui/material';

import { NumberMapFilters } from '../../filters';
import CompressionResults from '../../compressonResults/CompressionResults';
import FilteredDataGrid from '../../datagrid/FilteredDataGrid';
import { useUrlSelectedOptions } from '../../../hooks/useUrlSelectedOptions';
import { fakeData, numberOptionMap, columns } from './NumberOptionsConstants';
import ParamName from '../../../global/ParamName';

const NumberOptionsDemo: React.FC = () => {
  const { selectedOptions, handleOptionChange, compressedString } = useUrlSelectedOptions(numberOptionMap, ParamName);

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
    <Container maxWidth="xl">
      <Typography variant="h5" gutterBottom>
        Number Keys Demo
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        This demo uses a NumberOptionMap where numeric keys map to descriptive option values.
        Number keys provide consistent mapping regardless of insertion order.
      </Typography>

      <NumberMapFilters
        optionMap={numberOptionMap}
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

export default NumberOptionsDemo;
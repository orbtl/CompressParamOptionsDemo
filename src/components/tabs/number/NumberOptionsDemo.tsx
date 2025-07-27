import React, { useMemo } from 'react';
import {
  Container,
  Typography,
} from '@mui/material';

import { NumberMapFilters } from '../../filters';
import CompressionResults from '../../compressonResults/compressionResults';
import FilteredDataGrid from '../../datagrid/filteredDataGrid';
import { useUrlSelectedOptions } from '../../../hooks/useUrlSelectedOptions';
import { fakeData, numberOptionMap, columns } from './numberOptionsConstants';
import ParamName from '../../../global/paramName';
import { filterData } from '../../filters/logic/filterData';

const NumberOptionsDemo: React.FC = () => {
  const { selectedOptions, handleOptionChange, compressedString } = useUrlSelectedOptions(numberOptionMap, ParamName);

  const filteredData = useMemo(() => {
    if (selectedOptions.size === 0) return fakeData;
    return filterData(fakeData, selectedOptions);
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
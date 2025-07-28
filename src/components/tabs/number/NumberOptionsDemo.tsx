import React, { useState, useCallback, useEffect } from 'react';
import {
  Container,
  Typography,
} from '@mui/material';
import { debounce } from 'lodash';

import { NumberMapFilters } from '../../filters';
import CompressionResults from '../../compressonResults/compressionResults';
import FilteredDataGrid from '../../datagrid/filteredDataGrid';
import { useUrlSelectedOptions } from '../../../hooks/useUrlSelectedOptions';
import { fakeData, numberOptionMap, columns } from './numberOptionsConstants';
import ParamName from '../../../global/paramName';
import { filterData } from '../../filters/logic/filterData';
import type { FilterableData } from '../../filters/logic/filterable';
import type { SelectedOptions } from 'compress-param-options';

const NumberOptionsDemo: React.FC = () => {
  const { selectedOptions, handleOptionChange, compressedString } = useUrlSelectedOptions(numberOptionMap, ParamName);
  const [filteredData, setFilteredData] = useState<FilterableData[]>(fakeData);

  const filterDataWithDebounce = useCallback(
    debounce((localOptions: SelectedOptions) => {
      if (localOptions.size !== 0) {
        setFilteredData(filterData(fakeData, localOptions));
      } else {
        setFilteredData(fakeData);
      }
    },
      150),
    []);

  useEffect(() => {
    filterDataWithDebounce(selectedOptions);
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
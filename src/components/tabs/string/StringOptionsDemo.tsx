import React, { useMemo } from 'react';
import {
  Container,
  Typography,
} from '@mui/material';

import { StringMapFilters } from '../../filters';
import CompressionResults from '../../compressonResults/compressionResults';
import FilteredDataGrid from '../../datagrid/filteredDataGrid';
import { useUrlSelectedOptions } from '../../../hooks/useUrlSelectedOptions';
import { fakeData, stringOptionMap, columns } from './stringOptionsConstants';
import ParamName from '../../../global/paramName';
import { filterData } from '../../filters/logic/filterData';

const StringOptionsDemo: React.FC = () => {
  const { selectedOptions, handleOptionChange, compressedString } = useUrlSelectedOptions(stringOptionMap, ParamName);

  const filteredData = useMemo(() => {
    if (selectedOptions.size === 0) return fakeData;
    return filterData(fakeData, selectedOptions);
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
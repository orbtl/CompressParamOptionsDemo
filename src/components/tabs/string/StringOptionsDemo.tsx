import React, { useCallback, useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import debounce from 'lodash-es/debounce';

import { StringMapFilters } from '../../filters';
import CompressionResults from '../../compressonResults/compressionResults';
import FilteredDataGrid from '../../datagrid/filteredDataGrid';
import { useUrlSelectedOptions } from '../../../hooks/useUrlSelectedOptions';
import { fakeData, stringOptionMap, columns } from './stringOptionsConstants';
import ParamName from '../../../global/paramName';
import { filterData } from '../../filters/logic/filterData';
import type { FilterableData } from '../../filters/logic/filterable';
import type { SelectedOptions } from 'compress-param-options';

const StringOptionsDemo: React.FC = () => {
  const { selectedOptions, handleOptionChange, compressedString } = useUrlSelectedOptions(stringOptionMap, ParamName);
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
import React, { useCallback, useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import debounce from 'lodash-es/debounce';

import { ArrayMapFilters } from '../../filters';
import CompressionResults from '../../compressonResults/compressionResults';
import FilteredDataGrid from '../../datagrid/filteredDataGrid';
import { useUrlSelectedOptions } from '../../../hooks/useUrlSelectedOptions';
import { columns, fakeData, arrayOptionMap } from './arrayOptionsConstants';
import ParamName from '../../../global/paramName';
import { filterData } from '../../filters/logic/filterData';
import type { FilterableData } from '../../filters/logic/filterable';
import type { SelectedOptions } from 'compress-param-options';

const ArrayOptionsDemo: React.FC = () => {
  const { selectedOptions, handleOptionChange, compressedString } = useUrlSelectedOptions(arrayOptionMap, ParamName);
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
    <>
      <Typography variant="h5" gutterBottom>
        Array Options Demo
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        This demo uses an ArrayOptionMap where options are stored in a simple array.
        The array index serves as the key for compression. Note that changing array order affects compression results.
      </Typography>

      <ArrayMapFilters
        optionMap={arrayOptionMap}
        selectedOptions={selectedOptions}
        onOptionChange={handleOptionChange}
      />

      <Box>
        <CompressionResults
          compressedOptions={compressedString}
          decompressedOptions={selectedOptions}
        />

        <Alert severity="warning" sx={{ mt: 2 }}>
          <Typography variant="body2">
            <strong>Array Order Warning:</strong> With ArrayOptionMap, changing the order of items in the array
            will affect compression results. Use StringOptionMap or NumberOptionMap for stable compression
            when array order might change.
          </Typography>
        </Alert>
      </Box>

      <FilteredDataGrid
        data={filteredData}
        columns={columns}
        title="Filtered Data"
      />
    </>
  );
};

export default ArrayOptionsDemo;
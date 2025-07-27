import React, { useMemo } from 'react';
import {
  Container,
  Typography,
  Alert,
  Box
} from '@mui/material';

import { ArrayMapFilters } from '../../filters';
import CompressionResults from '../../compressonResults/compressionResults';
import FilteredDataGrid from '../../datagrid/filteredDataGrid';
import { useUrlSelectedOptions } from '../../../hooks/useUrlSelectedOptions';
import { columns, fakeData, arrayOptionMap } from './arrayOptionsConstants';
import ParamName from '../../../global/paramName';
import { filterData } from '../../filters/logic/filterData';

const ArrayOptionsDemo: React.FC = () => {
  const { selectedOptions, handleOptionChange, compressedString } = useUrlSelectedOptions(arrayOptionMap, ParamName);

  const filteredData = useMemo(() => {
    if (selectedOptions.size === 0) return fakeData;
    return filterData(fakeData, selectedOptions);
  }, [selectedOptions]);

  return (
    <Container maxWidth="xl">
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
    </Container>
  );
};

export default ArrayOptionsDemo;
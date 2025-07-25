import React, { useMemo } from 'react';
import {
  Grid,
  Typography,
  Alert,
  Box
} from '@mui/material';

import { ArrayMapFilters } from '../../filters';
import CompressionResults from '../../common/CompressionResults';
import FilteredDataGrid from '../../datagrid/FilteredDataGrid';
import { useUrlSelectedOptions } from '../../../hooks/useUrlSelectedOptions';
import { columns, fakeData, arrayOptionMap } from './ArrayOptionsConstants';

const ArrayOptionsDemo: React.FC = () => {
  const { selectedOptions, handleOptionChange, compressedString } = useUrlSelectedOptions(arrayOptionMap, 'f');

  const filteredData = useMemo(() => {
    if (selectedOptions.size === 0) return fakeData;
    return fakeData.filter(row => {
      const allRowOptions = [
        ...row.features,
        ...row.platforms,
        row.tier,
        ...row.integrations,
        ...row.compliance
      ];

      return allRowOptions.some(option => selectedOptions.has(option));
    });
  }, [selectedOptions]);

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12 }}>
        <Typography variant="h5" gutterBottom>
          Array Options Demo
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          This demo uses an ArrayOptionMap where options are stored in a simple array.
          The array index serves as the key for compression. Note that changing array order affects compression results.
        </Typography>
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <ArrayMapFilters
          optionMap={arrayOptionMap}
          selectedOptions={selectedOptions}
          onOptionChange={handleOptionChange}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 8 }}>
        <Box>
          <CompressionResults
            selectedOptions={selectedOptions}
            compressedOptions={compressedString}
            decompressedOptions={selectedOptions}
            formatOptionLabel={(option) => `[${arrayOptionMap.indexOf(option)}] ${option}`}
          />

          <Alert severity="warning" sx={{ mt: 2 }}>
            <Typography variant="body2">
              <strong>Array Order Warning:</strong> With ArrayOptionMap, changing the order of items in the array
              will affect compression results. Use StringOptionMap or NumberOptionMap for stable compression
              when array order might change.
            </Typography>
          </Alert>
        </Box>
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

export default ArrayOptionsDemo;
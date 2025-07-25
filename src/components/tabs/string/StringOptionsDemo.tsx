import React, { useState, useMemo } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Alert,
  Chip,
  Divider,
  Card,
  CardContent,
  Stack
} from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import {
  compressOptions,
  decompressOptions,
  type StringOptionMap,
  type SelectedOptions,
  CompressionOptions
} from 'compress-param-options';

import { StringMapFilters } from '../../filters';

const stringOptionMap: StringOptionMap = {
  'lg': 'size-large',
  'med': 'size-medium',
  'sm': 'size-small',
  'cold': 'temperature-cold',
  'warm': 'temperature-warm',
  'hot': 'temperature-hot',
  'red': 'color-red',
  'blue': 'color-blue',
  'green': 'color-green',
  'yellow': 'color-yellow',
  'fast': 'speed-fast',
  'slow': 'speed-slow',
  'auto': 'mode-automatic',
  'manual': 'mode-manual'
};

interface DataRow {
  id: number;
  name: string;
  category: string;
  size: string;
  temperature: string;
  color: string;
  speed: string;
  mode: string;
}

const generateFakeData = (): DataRow[] => {
  const names = ['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta'];
  const categories = ['Electronics', 'Clothing', 'Food', 'Tools'];
  const sizes = ['size-large', 'size-medium', 'size-small'];
  const temperatures = ['temperature-cold', 'temperature-warm', 'temperature-hot'];
  const colors = ['color-red', 'color-blue', 'color-green', 'color-yellow'];
  const speeds = ['speed-fast', 'speed-slow'];
  const modes = ['mode-automatic', 'mode-manual'];

  return Array.from({ length: 50 }, (_, index) => ({
    id: index + 1,
    name: `${names[index % names.length]} ${Math.floor(index / names.length) + 1}`,
    category: categories[index % categories.length],
    size: sizes[index % sizes.length],
    temperature: temperatures[index % temperatures.length],
    color: colors[index % colors.length],
    speed: speeds[index % speeds.length],
    mode: modes[index % modes.length]
  }));
};
const fakeData = generateFakeData();

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'category', headerName: 'Category', width: 130 },
  { field: 'size', headerName: 'Size', width: 130 },
  { field: 'temperature', headerName: 'Temperature', width: 150 },
  { field: 'color', headerName: 'Color', width: 130 },
  { field: 'speed', headerName: 'Speed', width: 130 },
  { field: 'mode', headerName: 'Mode', width: 130 }
];

const StringOptionsDemo: React.FC = () => {
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>(new Set());

  const filteredData: DataRow[] = useMemo(() => {
    if (selectedOptions.size === 0) return fakeData;

    return fakeData.filter(row => {
      return selectedOptions.has(row.size) ||
        selectedOptions.has(row.temperature) ||
        selectedOptions.has(row.color) ||
        selectedOptions.has(row.speed) ||
        selectedOptions.has(row.mode);
    });
  }, [fakeData, selectedOptions]);

  const handleOptionChange = (option: string, checked: boolean) => {
    const newSelected = new Set(selectedOptions);
    if (checked) {
      newSelected.add(option);
    } else {
      newSelected.delete(option);
    }
    setSelectedOptions(newSelected);
  };

  const compressedOptions: string = useMemo(() => {
    if (selectedOptions.size === 0) return '';
    try {
      return compressOptions(stringOptionMap, selectedOptions, CompressionOptions.default());
    } catch (error) {
      return `Error: ${error}`;
    }
  }, [selectedOptions]);

  const decompressedOptions: SelectedOptions = useMemo(() => {
    if (!compressedOptions || compressedOptions.startsWith('Error:')) return new Set();
    try {
      return decompressOptions(stringOptionMap, compressedOptions);
    } catch {
      return new Set();
    }
  }, [compressedOptions]);

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

        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Compression Results
            </Typography>

            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2">Selected Options:</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                {Array.from(selectedOptions).map((option) => (
                  <Chip key={option} label={option} size="small" />
                ))}
                {selectedOptions.size === 0 && (
                  <Typography variant="body2" color="text.secondary">
                    No options selected
                  </Typography>
                )}
              </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2">Compressed String:</Typography>
              <Paper sx={{ p: 2, mt: 1, bgcolor: 'grey.100' }}>
                <Typography variant="body1" fontFamily="monospace">
                  {compressedOptions || 'N/A'}
                </Typography>
              </Paper>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2">Decompressed Options:</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                {Array.from(decompressedOptions).map((option) => (
                  <Chip key={option} label={option} size="small" color="secondary" />
                ))}
                {decompressedOptions.size === 0 && (
                  <Typography variant="body2" color="text.secondary">
                    No decompressed options
                  </Typography>
                )}
              </Box>
            </Box>

            {selectedOptions.size > 0 && (
              <Alert severity="info" sx={{ mt: 2 }}>
                Compression ratio: {selectedOptions.size} options → {compressedOptions.length} characters
              </Alert>
            )}
          </CardContent>
        </Card>
      </Stack>

      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Filtered Data ({filteredData.length} rows)
          </Typography>
          <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={filteredData}
              disableRowSelectionOnClick
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              pageSizeOptions={[5, 10, 25]}
            />
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default StringOptionsDemo;
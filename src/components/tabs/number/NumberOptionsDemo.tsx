import React, { useState, useMemo } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Alert,
  Chip,
  Divider,
  Card,
  CardContent
} from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import {
  compressOptions,
  decompressOptions,
  type NumberOptionMap,
  type SelectedOptions,
  CompressionOptions
} from 'compress-param-options';

import { NumberMapFilters } from '../../filters';

const numberOptionMap: NumberOptionMap = {
  1: 'priority-high',
  2: 'priority-medium',
  3: 'priority-low',
  10: 'status-active',
  11: 'status-inactive',
  12: 'status-pending',
  20: 'type-urgent',
  21: 'type-standard',
  22: 'type-bulk',
  30: 'region-north',
  31: 'region-south',
  32: 'region-east',
  33: 'region-west',
  40: 'department-sales',
  41: 'department-marketing',
  42: 'department-engineering',
  43: 'department-support'
};

interface DataRow {
  id: number;
  name: string;
  priority: string;
  status: string;
  type: string;
  region: string;
  department: string;
  score: number;
}

const generateFakeData = (): DataRow[] => {
  const names = ['Project Alpha', 'Task Beta', 'Initiative Gamma', 'Process Delta', 'System Epsilon'];
  const priorities = ['priority-high', 'priority-medium', 'priority-low'];
  const statuses = ['status-active', 'status-inactive', 'status-pending'];
  const types = ['type-urgent', 'type-standard', 'type-bulk'];
  const regions = ['region-north', 'region-south', 'region-east', 'region-west'];
  const departments = ['department-sales', 'department-marketing', 'department-engineering', 'department-support'];

  return Array.from({ length: 60 }, (_, index) => ({
    id: index + 1,
    name: `${names[index % names.length]} ${Math.floor(index / names.length) + 1}`,
    priority: priorities[index % priorities.length],
    status: statuses[index % statuses.length],
    type: types[index % types.length],
    region: regions[index % regions.length],
    department: departments[index % departments.length],
    score: Math.floor(Math.random() * 100) + 1
  }));
};

const NumberOptionsDemo: React.FC = () => {
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>(new Set());
  const fakeData = useMemo(() => generateFakeData(), []);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'priority', headerName: 'Priority', width: 130 },
    { field: 'status', headerName: 'Status', width: 130 },
    { field: 'type', headerName: 'Type', width: 130 },
    { field: 'region', headerName: 'Region', width: 130 },
    { field: 'department', headerName: 'Department', width: 150 },
    { field: 'score', headerName: 'Score', width: 100 }
  ];

  const filteredData = useMemo(() => {
    if (selectedOptions.size === 0) return fakeData;

    return fakeData.filter(row => {
      return selectedOptions.has(row.priority) ||
        selectedOptions.has(row.status) ||
        selectedOptions.has(row.type) ||
        selectedOptions.has(row.region) ||
        selectedOptions.has(row.department);
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

  const compressedOptions = useMemo(() => {
    if (selectedOptions.size === 0) return '';
    try {
      return compressOptions(numberOptionMap, selectedOptions, CompressionOptions.default());
    } catch (error) {
      return `Error: ${error}`;
    }
  }, [selectedOptions]);

  const decompressedOptions: SelectedOptions = useMemo(() => {
    if (!compressedOptions || compressedOptions.startsWith('Error:')) return new Set();
    try {
      return decompressOptions(numberOptionMap, compressedOptions);
    } catch (error) {
      return new Set();
    }
  }, [compressedOptions]);

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
        <Card>
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
      </Grid>

      <Grid size={{ xs: 12 }}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Filtered Data ({filteredData.length} rows)
            </Typography>
            <Box sx={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={filteredData}
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
      </Grid>
    </Grid>
  );
};

export default NumberOptionsDemo;
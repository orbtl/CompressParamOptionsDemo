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
  type ArrayOptionMap,
  type SelectedOptions,
  CompressionOptions
} from 'compress-param-options';

import { ArrayMapFilters } from '../../filters';

const arrayOptionMap: ArrayOptionMap = [
  'feature-authentication',
  'feature-analytics',
  'feature-notifications',
  'feature-search',
  'feature-export',
  'feature-import',
  'feature-reporting',
  'feature-automation',
  'platform-web',
  'platform-mobile',
  'platform-desktop',
  'platform-api',
  'tier-basic',
  'tier-premium',
  'tier-enterprise',
  'integration-slack',
  'integration-teams',
  'integration-email',
  'integration-webhook',
  'compliance-gdpr',
  'compliance-hipaa',
  'compliance-sox'
];

interface DataRow {
  id: number;
  name: string;
  features: string[];
  platforms: string[];
  tier: string;
  integrations: string[];
  compliance: string[];
  users: number;
}

const generateFakeData = (): DataRow[] => {
  const names = ['Service A', 'Application B', 'Platform C', 'Tool D', 'System E'];
  const allFeatures = arrayOptionMap.filter(opt => opt.startsWith('feature-'));
  const allPlatforms = arrayOptionMap.filter(opt => opt.startsWith('platform-'));
  const allTiers = arrayOptionMap.filter(opt => opt.startsWith('tier-'));
  const allIntegrations = arrayOptionMap.filter(opt => opt.startsWith('integration-'));
  const allCompliance = arrayOptionMap.filter(opt => opt.startsWith('compliance-'));

  return Array.from({ length: 40 }, (_, index) => {
    const numFeatures = Math.floor(Math.random() * 4) + 1;
    const numPlatforms = Math.floor(Math.random() * 3) + 1;
    const numIntegrations = Math.floor(Math.random() * 3);
    const numCompliance = Math.floor(Math.random() * 2);

    return {
      id: index + 1,
      name: `${names[index % names.length]} ${Math.floor(index / names.length) + 1}`,
      features: allFeatures.slice(0, numFeatures),
      platforms: allPlatforms.slice(0, numPlatforms),
      tier: allTiers[index % allTiers.length],
      integrations: allIntegrations.slice(0, numIntegrations),
      compliance: allCompliance.slice(0, numCompliance),
      users: Math.floor(Math.random() * 1000) + 10
    };
  });
};

const ArrayOptionsDemo: React.FC = () => {
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>(new Set());
  const fakeData = useMemo(() => generateFakeData(), []);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 150 },
    {
      field: 'features',
      headerName: 'Features',
      width: 200,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {(params.value as string[]).slice(0, 2).map((feature: string) => (
            <Chip key={feature} label={feature.replace('feature-', '')} size="small" />
          ))}
          {(params.value as string[]).length > 2 && <Chip label={`+${(params.value as string[]).length - 2}`} size="small" />}
        </Box>
      )
    },
    {
      field: 'platforms',
      headerName: 'Platforms',
      width: 150,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {(params.value as string[]).map((platform: string) => (
            <Chip key={platform} label={platform.replace('platform-', '')} size="small" color="secondary" />
          ))}
        </Box>
      )
    },
    { field: 'tier', headerName: 'Tier', width: 120 },
    { field: 'users', headerName: 'Users', width: 100 }
  ];

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
      return compressOptions(arrayOptionMap, selectedOptions, CompressionOptions.default());
    } catch (error) {
      return `Error: ${error}`;
    }
  }, [selectedOptions]);

  const decompressedOptions: SelectedOptions = useMemo(() => {
    if (!compressedOptions || compressedOptions.startsWith('Error:')) return new Set();
    try {
      return decompressOptions(arrayOptionMap, compressedOptions);
    } catch (error) {
      return new Set();
    }
  }, [compressedOptions]);


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
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Compression Results
            </Typography>

            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2">Selected Options:</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                {Array.from(selectedOptions).map((option) => (
                  <Chip
                    key={option}
                    label={`[${arrayOptionMap.indexOf(option)}] ${option}`}
                    size="small"
                  />
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
                  <Chip
                    key={option}
                    label={`[${arrayOptionMap.indexOf(option)}] ${option}`}
                    size="small"
                    color="secondary"
                  />
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

            <Alert severity="warning" sx={{ mt: 2 }}>
              <Typography variant="body2">
                <strong>Array Order Warning:</strong> With ArrayOptionMap, changing the order of items in the array
                will affect compression results. Use StringOptionMap or NumberOptionMap for stable compression
                when array order might change.
              </Typography>
            </Alert>
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

export default ArrayOptionsDemo;
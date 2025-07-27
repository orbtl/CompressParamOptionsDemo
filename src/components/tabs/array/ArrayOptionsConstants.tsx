import React from 'react';
import {
  Chip,
  Box
} from '@mui/material';
import { type GridColDef, type GridRenderCellParams, type GridTreeNodeWithRender } from '@mui/x-data-grid';
import {
  type ArrayOptionMap,
} from 'compress-param-options';
import type { FilterableData } from '../../filters/logic/filterable';
import MultiChipCell from './multiChipCell';

export const arrayOptionMap: ArrayOptionMap = [
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

export interface ArrayExampleDataRow extends FilterableData {
  id: number;
  name: string;
  feature: string[];
  platform: string[];
  tier: string;
  integration: string[];
  compliance: string[];
  users: number;
}

const generateFakeData = (): ArrayExampleDataRow[] => {
  const names = ['Service A', 'Application B', 'Platform C', 'Tool D', 'System E'];
  const allFeatures = arrayOptionMap.filter(opt => opt.startsWith('feature-')).map(opt => opt.substring(8));
  const allPlatforms = arrayOptionMap.filter(opt => opt.startsWith('platform-')).map(opt => opt.substring(9));
  const allTiers = arrayOptionMap.filter(opt => opt.startsWith('tier-')).map(opt => opt.substring(5));
  const allIntegrations = arrayOptionMap.filter(opt => opt.startsWith('integration-')).map(opt => opt.substring(12));
  const allCompliance = arrayOptionMap.filter(opt => opt.startsWith('compliance-')).map(opt => opt.substring(11));

  return Array.from({ length: 40 }, (_, index) => {
    const numFeatures = Math.floor(Math.random() * 8) + 1;
    const numPlatforms = Math.floor(Math.random() * 4) + 1;
    const numIntegrations = Math.floor(Math.random() * 4 + 1);
    const numCompliance = Math.floor(Math.random() * 3 + 1);

    return {
      id: index + 1,
      name: `${names[index % names.length]} ${Math.floor(index / names.length) + 1}`,
      feature: allFeatures.slice(0, numFeatures),
      platform: allPlatforms.slice(0, numPlatforms),
      tier: allTiers[index % allTiers.length],
      integration: allIntegrations.slice(0, numIntegrations),
      compliance: allCompliance.slice(0, numCompliance),
      users: Math.floor(Math.random() * 1000) + 10
    };
  });
};
export const fakeData = generateFakeData();

export const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 150 },
  {
    field: 'feature',
    headerName: 'Features',
    width: 200,
    renderCell: (params) => (
      <MultiChipCell
        dataGridParams={params}
        maxCount={3}
        replaceString='feature-'
      />
    )
  },
  {
    field: 'platform',
    headerName: 'Platforms',
    width: 150,
    renderCell: (params) => (
      <MultiChipCell
        color='secondary'
        dataGridParams={params}
        maxCount={3}
        replaceString='platform-'
      />
    )
  },
  {
    field: 'integration',
    headerName: 'Integrations',
    width: 150,
    renderCell: (params) => (
      <MultiChipCell
        color='success'
        dataGridParams={params}
        maxCount={3}
        replaceString='integration-'
      />
    )
  },
  {
    field: 'compliance',
    headerName: 'Compliances',
    width: 150,
    renderCell: (params) => (
      <MultiChipCell
        color='warning'
        dataGridParams={params}
        maxCount={3}
        replaceString='compliance-'
      />
    )
  },
  { field: 'tier', headerName: 'Tier', width: 120 },
  { field: 'users', headerName: 'Users', width: 100 }
];
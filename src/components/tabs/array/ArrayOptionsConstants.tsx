import {
  Chip,
  Box
} from '@mui/material';
import { type GridColDef } from '@mui/x-data-grid';
import {
  type ArrayOptionMap,
} from 'compress-param-options';
import type { FilterableData } from '../../filters/logic/filterable';

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
    const numFeatures = Math.floor(Math.random() * 4) + 1;
    const numPlatforms = Math.floor(Math.random() * 3) + 1;
    const numIntegrations = Math.floor(Math.random() * 3);
    const numCompliance = Math.floor(Math.random() * 2);

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
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
        {(params.value as string[]).slice(0, 2).map((feature: string) => (
          <Chip key={feature} label={feature.replace('feature-', '')} size="small" />
        ))}
        {(params.value as string[]).length > 2 && <Chip label={`+${(params.value as string[]).length - 2}`} size="small" />}
      </Box>
    )
  },
  {
    field: 'platform',
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

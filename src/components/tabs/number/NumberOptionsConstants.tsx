import { type GridColDef } from '@mui/x-data-grid';
import {
  type NumberOptionMap,
} from 'compress-param-options';

export const numberOptionMap: NumberOptionMap = {
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
export const fakeData = generateFakeData();

export const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'priority', headerName: 'Priority', width: 130 },
  { field: 'status', headerName: 'Status', width: 130 },
  { field: 'type', headerName: 'Type', width: 130 },
  { field: 'region', headerName: 'Region', width: 130 },
  { field: 'department', headerName: 'Department', width: 150 },
  { field: 'score', headerName: 'Score', width: 100 }
];

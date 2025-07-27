import { type GridColDef } from '@mui/x-data-grid';
import { type StringOptionMap } from 'compress-param-options';
import { type FilterableData } from '../../filters/logic/filterable';

export const stringOptionMap: StringOptionMap = {
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

export interface StringExampleDataRow extends FilterableData {
  id: number;
  name: string;
  category: string;
  size: string;
  temperature: string;
  color: string;
  speed: string;
  mode: string;
}

const generateFakeData = (): StringExampleDataRow[] => {
  const names = ['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta'];
  const categories = ['Electronics', 'Clothing', 'Food', 'Tools'];
  const sizes = ['large', 'medium', 'small'];
  const temperatures = ['cold', 'warm', 'hot'];
  const colors = ['red', 'blue', 'green', 'yellow'];
  const speeds = ['fast', 'slow'];
  const modes = ['automatic', 'manual'];

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
export const fakeData = generateFakeData();

export const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'category', headerName: 'Category', width: 130 },
  { field: 'size', headerName: 'Size', width: 130 },
  { field: 'temperature', headerName: 'Temperature', width: 150 },
  { field: 'color', headerName: 'Color', width: 130 },
  { field: 'speed', headerName: 'Speed', width: 130 },
  { field: 'mode', headerName: 'Mode', width: 130 }
];

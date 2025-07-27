import React from 'react';
import {
  Chip,
  Box
} from '@mui/material';
import { type GridRenderCellParams, type GridTreeNodeWithRender } from '@mui/x-data-grid';

interface MultiChipCellProps {
  dataGridParams: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>;
  maxCount: number;
  replaceString: string;
  color?: "primary" | "default" | "secondary" | "error" | "info" | "success" | "warning";
}

const MultiChipCell: React.FC<MultiChipCellProps> = ({
  dataGridParams,
  maxCount,
  replaceString,
  color = 'primary',
}) => {
  const stringArray = dataGridParams.value as string[];
  const includedValues = stringArray.slice(0, maxCount);
  const numExcluded = stringArray.length - maxCount;
  const excludedChip = numExcluded > 0
    ? <Chip label={`+${numExcluded}`} size="small" color={color} />
    : null;

  return <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
    {includedValues.map((value) => (
      <Chip
        color={color}
        key={value}
        label={value.replace(replaceString, '')}
        size="small"
      />
    ))}
    {excludedChip}
  </Box>;
}

export default MultiChipCell;
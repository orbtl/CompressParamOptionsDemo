import React from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent
} from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import type { UniversalDataRow } from './universalDataRow';

interface FilteredDataGridProps {
  data: readonly UniversalDataRow[];
  columns: GridColDef[];
  title?: string;
}

const FilteredDataGrid: React.FC<FilteredDataGridProps> = ({
  data,
  columns,
  title = 'Filtered Data'
}) => {
  return (
    <Card sx={{ mt: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title} ({data.length} rows)
        </Typography>
        {/* Workaround for bug with datagrid's horizontal resizing */}
        <Box sx={{ flex: 1, position: 'relative', height: 400 }}>
          <Box sx={{ position: 'absolute', inset: 0 }}>
            <DataGrid
              rows={data}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              pageSizeOptions={[5, 10, 25]}
              sx={{}}
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default FilteredDataGrid;
import React from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent
} from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';

interface FilteredDataGridProps {
  data: readonly any[];
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
        <Box sx={{ height: 400, width: '100%' }}>
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
      </CardContent>
    </Card>
  );
};

export default FilteredDataGrid;
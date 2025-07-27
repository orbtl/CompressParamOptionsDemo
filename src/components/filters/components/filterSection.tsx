import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  FormGroup,
  Typography,
} from '@mui/material';

interface FilterSectionProps {
  children?: React.ReactNode;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  children,
}) => {
  return (
    <Card sx={{ minWidth: 300 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Filter Options
        </Typography>
        <FormGroup>
          <Grid container spacing={2}>
            {children}
          </Grid>
        </FormGroup>
      </CardContent>
    </Card>
  );
};

export default FilterSection;
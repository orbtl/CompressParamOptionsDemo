import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import FormGroup from '@mui/material/FormGroup';
import Typography from '@mui/material/Typography';

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
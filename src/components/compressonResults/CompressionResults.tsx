import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Paper from '@mui/material/Paper';
import { type SelectedOptions } from 'compress-param-options';

interface CompressionResultsProps {
  compressedOptions: string;
  decompressedOptions: SelectedOptions;
}

const CompressionResults: React.FC<CompressionResultsProps> = ({
  compressedOptions,
  decompressedOptions,
}) => {
  return (
    <Card sx={{ flex: 1, mt: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Compression Results
        </Typography>

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
              <Chip key={option} label={option} size="small" color="secondary" />
            ))}
            {decompressedOptions.size === 0 && (
              <Typography variant="body2" color="text.secondary">
                No decompressed options
              </Typography>
            )}
          </Box>
        </Box>

        {decompressedOptions.size > 0 && compressedOptions && !compressedOptions.startsWith('Error:') && (
          <Alert severity="info" sx={{ mt: 2 }}>
            Compression ratio: {decompressedOptions.size} options → {compressedOptions.length} characters
          </Alert>
        )}

        {compressedOptions.startsWith('Error:') && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {compressedOptions}
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default CompressionResults;
import React from 'react';
import {
  Typography,
  Box,
  Alert,
  Chip,
  Divider,
  Card,
  CardContent,
  Paper
} from '@mui/material';
import { type SelectedOptions } from 'compress-param-options';

interface CompressionResultsProps {
  selectedOptions: SelectedOptions;
  compressedOptions: string;
  decompressedOptions: SelectedOptions;
  formatOptionLabel?: (option: string) => string;
}

const CompressionResults: React.FC<CompressionResultsProps> = ({
  selectedOptions,
  compressedOptions,
  decompressedOptions,
  formatOptionLabel = (option) => option
}) => {
  return (
    <Card sx={{ flex: 1 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Compression Results
        </Typography>
        
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2">Selected Options:</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
            {Array.from(selectedOptions).map((option) => (
              <Chip key={option} label={formatOptionLabel(option)} size="small" />
            ))}
            {selectedOptions.size === 0 && (
              <Typography variant="body2" color="text.secondary">
                No options selected
              </Typography>
            )}
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

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
              <Chip key={option} label={formatOptionLabel(option)} size="small" color="secondary" />
            ))}
            {decompressedOptions.size === 0 && (
              <Typography variant="body2" color="text.secondary">
                No decompressed options
              </Typography>
            )}
          </Box>
        </Box>

        {selectedOptions.size > 0 && compressedOptions && !compressedOptions.startsWith('Error:') && (
          <Alert severity="info" sx={{ mt: 2 }}>
            Compression ratio: {selectedOptions.size} options → {compressedOptions.length} characters
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
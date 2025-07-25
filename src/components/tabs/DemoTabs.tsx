import React, { useState } from 'react';
import {
  Tabs,
  Tab,
  Box,
  Typography,
} from '@mui/material';

import StringOptionsDemo from './string/StringOptionsDemo';
import NumberOptionsDemo from './number/NumberOptionsDemo';
import ArrayOptionsDemo from './array/ArrayOptionsDemo';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`demo-tabpanel-${index}`}
      aria-labelledby={`demo-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `demo-tab-${index}`,
    'aria-controls': `demo-tabpanel-${index}`,
  };
}

const DemoTabs: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <>
      <Typography variant="h4" gutterBottom align="center">
        Interactive Demo for compress-param-options
      </Typography>
      <Typography variant="body1" gutterBottom align="center" color="text.secondary">
        Explore how different data structure types can be compressed for URL parameters
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 2 }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="demo tabs" centered>
          <Tab label="String Keys" {...a11yProps(0)} />
          <Tab label="Number Keys" {...a11yProps(1)} />
          <Tab label="Array Options" {...a11yProps(2)} />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <StringOptionsDemo />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <NumberOptionsDemo />
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        <ArrayOptionsDemo />
      </TabPanel>
    </>
  );
};

export default DemoTabs;
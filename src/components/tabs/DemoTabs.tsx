import React, { useCallback } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import {
  Tabs,
  Tab,
  Box,
  Typography,
} from '@mui/material';

import StringOptionsDemo from './string/StringOptionsDemo';
import NumberOptionsDemo from './number/NumberOptionsDemo';
import ArrayOptionsDemo from './array/ArrayOptionsDemo';

const tabRoutes = [
  { path: '/', label: 'String Keys', component: StringOptionsDemo },
  { path: '/number', label: 'Number Keys', component: NumberOptionsDemo },
  { path: '/array', label: 'Array Options', component: ArrayOptionsDemo },
];

const tabLookup = tabRoutes.reduce((acc: Record<string, number>, route, index) => {
  acc[route.path] = index;
  return acc;
}, {});

const DemoTabs: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Determine current tab based on pathname
  const currentTab = location.pathname in tabLookup
    ? tabLookup[location.pathname]
    : 0;

  const handleTabChange = useCallback((_event: React.SyntheticEvent, newValue: number) => {
    const route = tabRoutes[newValue];
    if (route) {
      navigate(route.path);
    }
  }, [navigate]);

  return (
    <>
      <Typography variant="h4" gutterBottom align="center">
        Interactive Demo for compress-param-options
      </Typography>
      <Typography variant="body1" gutterBottom align="center" color="text.secondary">
        Explore how different data structure types can be compressed for URL parameters
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 3 }}>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          aria-label="demo tabs"
          centered
        >
          {tabRoutes.map((route, index) => (
            <Tab
              key={route.path}
              label={route.label}
              id={`demo-tab-${index}`}
              aria-controls={`demo-tabpanel-${index}`}
            />
          ))}
        </Tabs>
      </Box>

      <Box sx={{ p: 3 }}>
        <Routes>
          <Route path="/" element={<StringOptionsDemo />} />
          <Route path="/number" element={<NumberOptionsDemo />} />
          <Route path="/array" element={<ArrayOptionsDemo />} />
        </Routes>
      </Box>
    </>
  );
};

export default DemoTabs;
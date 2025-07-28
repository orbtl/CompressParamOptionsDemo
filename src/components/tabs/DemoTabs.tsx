import React, { useCallback, useState } from 'react';
import { Routes, Route, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import {
  Tabs,
  Tab,
  Box,
  Typography,
  Button,
} from '@mui/material';

import StringOptionsDemo from './string/stringOptionsDemo';
import NumberOptionsDemo from './number/numberOptionsDemo';
import ArrayOptionsDemo from './array/arrayOptionsDemo';
import ParamName from '../../global/paramName';
import { useUrlSelectedOptions } from '../../hooks/useUrlSelectedOptions';
import { debounce } from 'lodash';

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
  const setSearchParams = useSearchParams()[1];
  // Force re-render of demo tab as the easiest way to clear selected options state
  const [demoKey, setDemoKey] = useState(false);

  const cycleKeyWithDebounce = useCallback(
    debounce(() => setDemoKey((prev: boolean) => !prev), 10),
    []
  );

  const clearOptions = useCallback(() => {
    setSearchParams((prevParams) => {
      prevParams.delete(ParamName);
      return prevParams;
    });
    cycleKeyWithDebounce();
  }, [setSearchParams, cycleKeyWithDebounce]);

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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Tabs
            value={currentTab}
            onChange={handleTabChange}
            aria-label="demo tabs"
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

          <Button
            variant="outlined"
            color="secondary"
            onClick={clearOptions}
            sx={{ ml: 2 }}
          >
            Clear Filters
          </Button>
        </Box>
      </Box>

      <Box sx={{ p: 3 }}>
        <Routes>
          <Route path="/" element={<StringOptionsDemo key={demoKey} />} />
          <Route path="/number" element={<NumberOptionsDemo key={demoKey} />} />
          <Route path="/array" element={<ArrayOptionsDemo key={demoKey} />} />
        </Routes>
      </Box>
    </>
  );
};

export default DemoTabs;
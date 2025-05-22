import React, { use, useEffect, useState } from 'react';
import BackButton from './components/BackButton';
import { Box } from '@mui/material';
import { LineChart } from '@mui/x-charts-pro';
import { Rake, rakeStore } from '../store/Rake.store';
import RakeIcon from '../components/sectionIcons/RakeIcon';
import PageHeader from './components/PageHeader';

const RakePage: React.FC = () => {
  const [rakes, setRakes] = useState<number[]>([]);
  const [dates, setDates] = useState<string[]>([]);

  useEffect(() => {
    setRakes(rakeStore.getAllRakeAmounts());
    setDates(rakeStore.getAllRakeDates());
  }, [rakeStore.rakes]);
  return (
    <Box sx={{ width: '100%', padding: 2 }}>
      <BackButton />
      <PageHeader title="Rakes" className="rake-card" icon={<RakeIcon />} />

      <LineChart
        xAxis={[
          {
            scaleType: 'point',
            data: dates,
            label: 'Date',
          },
        ]}
        series={[{ data: rakes, label: 'Amount', area: true }]}
        height={300}
      />
    </Box>
  );
};

export default RakePage;

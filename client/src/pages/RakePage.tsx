import { Box } from '@mui/material';
import { LineChart } from '@mui/x-charts-pro';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import RakeIcon from '../components/sectionIcons/RakeIcon';
import rakeStore from '../store/Rake.store';
import BackButton from './components/BackButton';
import PageHeader from './components/PageHeader';

const RakePage: React.FC = () => {
  const [rakes, setRakes] = useState<number[]>([]);
  const [dates, setDates] = useState<string[]>([]);
  const rakesForToday = rakes.filter((v, idx) =>
    moment(dates[idx]).isSame(moment(), 'day'),
  );

  useEffect(() => {
    setRakes(rakeStore.getAllRakeAmounts());
    setDates(rakeStore.getAllRakeDates());
  }, []);
  return (
    <Box sx={{ width: '100%', padding: 2 }}>
      <BackButton />
      <PageHeader title="Rakes" className="rake-card" icon={<RakeIcon />} />
      <Box sx={{ mb: 2 }}>
        <h2>
          Rake Today: ${rakesForToday.reduce((acc, curr) => acc + curr, 0)}
        </h2>
        <h2>Total Rake: ${rakes.reduce((acc, curr) => acc + curr, 0)}</h2>
      </Box>
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

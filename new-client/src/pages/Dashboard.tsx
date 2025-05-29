import { Grid } from '@mui/material';
import React from 'react';
import CurrentGame from '../components/CurrentGame/CurrentGame';
import Rake from '../components/Rake';
import Tip from '../components/Tip';

const Dashboard: React.FC = () => {
  console.log('Dashboard rendered');
  return (
    <>
      <Grid size={12}>
        <h1>Dashboard</h1>
        <p>Welcome to your dashboard.</p>
      </Grid>
      <CurrentGame />
      <Tip />
      <Rake />
    </>
  );
};

export default Dashboard;

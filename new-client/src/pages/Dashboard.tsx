import { Grid } from '@mui/material';
import React from 'react';
import CurrentGame from '../components/CurrentGame/CurrentGame';

const Dashboard: React.FC = () => {
  console.log('Dashboard rendered');
  return (
    <>
      <Grid size={12}>
        <h1>Dashboard</h1>
        <p>Welcome to your dashboard.</p>
      </Grid>
      <CurrentGame />
    </>
  );
};

export default Dashboard;

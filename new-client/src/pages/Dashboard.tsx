import { Grid } from '@mui/material';
import { observer } from 'mobx-react';
import React from 'react';
import CurrentGame from '../components/CurrentGame/CurrentGame';

const Dashboard: React.FC = () => {
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

export default observer(Dashboard);

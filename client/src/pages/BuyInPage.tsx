import { observer } from 'mobx-react';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react';
import moment from 'moment';
import { Box, Paper, TableContainer } from '@mui/material';
import BackButton from './components/BackButton';
import userStore from '../store/User.store';
import BuyInIcon from '../components/sectionIcons/BuyInIcon';
import PageHeader from './components/PageHeader';

const BuyInPage: React.FC = () => {
  return (
    <Box sx={{ width: '100%', padding: 2 }}>
      <BackButton />
      <PageHeader title="Buy In" className="buy-in-card" icon={<BuyInIcon />} />

      <TableContainer component={Paper}>
        <DataGrid
          rows={userStore.users.flatMap((user) =>
            user.transactions
              .filter((tx) => tx.type === 'buyin')
              .map((transaction) => ({
                id: transaction.id,
                name: user.name,
                amount: transaction.amount,
                isSettled: transaction.isSettled ? 'Settled' : 'Pending',
                type: transaction.type,
                date: moment(transaction.created_at).format(
                  'MMMM Do YYYY, h:mm:ss a',
                ),
              })),
          )}
          columns={[
            { field: 'name', headerName: 'Name', flex: 1 },
            {
              field: 'amount',
              headerName: 'Amount',
              flex: 1,
              renderCell: (params) => `$${params.value}`,
            },
            { field: 'isSettled', headerName: 'Is Settled', flex: 1 },
            { field: 'type', headerName: 'Type', flex: 1 },
            { field: 'date', headerName: 'Date', flex: 2 },
          ]}
        />
      </TableContainer>
    </Box>
  );
};

export default observer(BuyInPage);

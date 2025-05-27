import { Box, Paper, TableContainer } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { observer } from 'mobx-react';
import moment from 'moment';
import React from 'react';
import BuyInIcon from '../components/sectionIcons/BuyInIcon';
import userStore from '../store/User.store';
import BackButton from './components/BackButton';
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
              .filter((tx) => tx.type === 'borrow')
              .map((transaction) => ({
                id: transaction.id,
                name: user.name,
                amount: transaction.amount,
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
            { field: 'date', headerName: 'Date', flex: 2 },
          ]}
        />
      </TableContainer>
    </Box>
  );
};

export default observer(BuyInPage);

import { Box, Paper, TableContainer } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { observer } from 'mobx-react';
import moment from 'moment';
import React from 'react';
import CashOutIcon from '../components/sectionIcons/CashOutIcon';
import { ITransaction } from '../store/Transaction.store';
import userStore from '../store/User.store';
import BackButton from './components/BackButton';
import PageHeader from './components/PageHeader';

const CashOutPage: React.FC = () => {
  // Define columns and rows outside of JSX
  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', flex: 1 },
    {
      field: 'amount',
      headerName: 'Cash Out Amount',
      flex: 1,
      renderCell: (params) => `$${params.value}`,
    },
    {
      field: 'cashOutPaid',
      headerName: 'Cash Out Paid',
      flex: 1,
      renderCell: (params) => `$${params.value}`,
    },

    { field: 'date', headerName: 'Date', flex: 2 },
  ];

  const rows = userStore.users?.flatMap((user) =>
    user.transactions
      .filter((tx: ITransaction) => tx.type === 'cashout')
      .map((transaction: ITransaction) => ({
        id: transaction.id,
        name: user.name,
        cashOutPaid: transaction.cashOutPaid,
        amount: transaction.amount,
        type: transaction.type,
        date: moment(transaction.created_at).format('MMMM Do YYYY, h:mm:ss a'),
      })),
  );

  return (
    <Box sx={{ width: '100%', padding: 2 }}>
      <BackButton />
      <PageHeader
        title="Cash Out"
        className="cash-out-card"
        icon={<CashOutIcon />}
      />

      <TableContainer component={Paper}>
        <DataGrid rows={rows} columns={columns} />
      </TableContainer>
    </Box>
  );
};

export default observer(CashOutPage);
